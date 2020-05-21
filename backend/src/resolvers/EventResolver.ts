import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { EventResponse, EventsResponse } from '../graphql-types'
import { Event, Coord } from '../entity'
import { DI } from '../mikroconfig'
import { isInArea } from '../utils'

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

  @Query(() => EventsResponse)
  async getEventBaseOnPos(@Arg('input') { latitude, longitude }: Coord) {
    const events = await DI.em.getRepository(Event).findAll()
    events.filter((v) => {
      return isInArea(v.place.coord.latitude, v.place.coord.longitude, latitude, longitude, 'K')
    })

    return {
      events,
    }
  }

  @Mutation(() => EventResponse)
  async createEvent(
    @Arg('input') { hostId, time, place, information, membersInfo, tags }: Event,
  ): Promise<EventResponse> {
    try {
      const event = new Event()

      event.time = time
      event.place = place
      event.hostId = hostId
      event.information = information
      event.membersInfo = membersInfo
      event.tags = tags

      DI.eventRepos.persist(event)

      // update tags amount
      const tagsEntity = await DI.eventTagRepos.find({
        id: {
          $in: tags,
        },
      })

      tagsEntity.forEach((v) => {
        v.currentUse += 1
        DI.eventTagRepos.persist(v)
      })

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
