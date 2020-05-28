import { mapAsync } from 'lodasync'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Coord, Event } from '../../entity'
import { EventResponse, EventsResponse, EventsWithHostResponse } from '../../graphql-types'
import { MyContext } from '../../graphql-types/MyContext'
import { isAuth } from '../../middleware/isAuth'
import { DI } from '../../mikroconfig'
import { isInArea } from '../../utils'

@Resolver()
export class EventResolver {
  @Query(() => EventsResponse)
  async getEvents() {
    const events = await DI.eventRepos.findAll()

    return { events }
  }
  @Query(() => EventResponse)
  async getEventById(@Arg('id') id: string) {
    const event = await DI.eventRepos.findOne(id)

    return { event }
  }

  @Query(() => EventsWithHostResponse)
  async getEventBaseOnPos(@Arg('input') { latitude, longitude }: Coord) {
    const events = await DI.em.getRepository(Event).findAll()
    events.filter((v) => {
      return isInArea(v.place.coord.latitude, v.place.coord.longitude, latitude, longitude, 'K')
    })
    const result = await mapAsync(async (e: Event) => {
      const hostInfo = await DI.userRepos.findOne({ id: e.hostId })
      const avatar = await DI.imageRepos.findOne({ id: hostInfo?.avatarId })
      return { ...e, hostInfo, id: e.id, avatar }
    }, events)

    return {
      events: result,
    }
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth)
  async createEvent(
    @Arg('input') { startTime, endTime, place, information, membersInfo, tags }: Event,
    @Ctx() ctx: MyContext,
  ): Promise<EventResponse> {
    try {
      const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })

      const event = new Event()

      event.startTime = startTime
      event.endTime = endTime
      event.place = place
      event.information = information
      event.membersInfo = membersInfo
      event.tags = tags
      event.hostId = user?.id

      await DI.eventRepos.persist(event)

      // update tags amount
      const tagsEntity = await DI.eventTagRepos.find({
        id: {
          $in: tags,
        },
      })

      tagsEntity.forEach((v) => {
        v.currentUse += 1
      })

      await DI.em.flush()
      return {
        event,
      }
    } catch (error) {
      return {
        error: error,
      }
    }
  }
}
