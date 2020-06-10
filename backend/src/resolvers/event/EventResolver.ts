import { ApolloError } from 'apollo-server-express'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { mapAsync } from 'lodasync'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { v4 } from 'uuid'
import { Coord, Event } from '../../entity'
import { EventInput } from '../../graphql-types'
import { EventWithHost } from '../../graphql-types/event/EventResponse'
import { MyContext } from '../../graphql-types/MyContext'
import { isAuth } from '../../middleware/isAuth'
import { DI } from '../../mikroconfig'
import { isInArea } from '../../utils'
import { createImg } from '../../utils/CreateFile'
import { createWriteStream } from 'fs'
// import {  } from '../../../images'

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async getEvents(): Promise<Event[]> {
    const events = await DI.eventRepos.findAll()

    return events
  }

  @Query(() => Event, { nullable: true })
  async getEventById(@Arg('id') id: string): Promise<Event | null> {
    const event = await DI.eventRepos.findOne(id)

    return event
  }

  @Query(() => [EventWithHost])
  async getEventBaseOnPos(@Arg('input') { latitude, longitude }: Coord): Promise<EventWithHost[]> {
    const events = await DI.em.getRepository(Event).findAll()
    events.filter((v) => {
      return isInArea(v.place.coord.latitude, v.place.coord.longitude, latitude, longitude, 'K')
    })
    const result = await mapAsync(async (e: Event) => {
      const hostInfo = await DI.userRepos.findOne({ id: e.hostId })

      return { ...e, hostInfo: { ...hostInfo, id: hostInfo!.id }, id: e.id }
    }, events)

    return result
  }

  @Mutation(() => Boolean)
  async testMultipleFile(@Arg('picture', () => GraphQLUpload) files: [FileUpload]) {
    for (const file of files) {
      const { filename, createReadStream } = await file
      console.log('123', filename, createReadStream)
    }
    return true
  }

  @Mutation(() => Event)
  @UseMiddleware(isAuth)
  async createEvent(
    @Arg('event')
    { startTime, endTime, place, information, tags, galleries, thumbnail }: EventInput,
    // @Arg('galleries', () => [GraphQLUpload]) galleries: FileUpload[],
    @Ctx() ctx: MyContext,
  ): Promise<Event> {
    try {
      const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })

      const event = new Event()

      event.startTime = startTime
      event.endTime = endTime
      event.place = place
      event.information = information
      event.membersInfo = []
      event.tags = tags
      event.hostId = user!.id
      event.galleries = []

      for (const gallery of galleries.files) {
        const id = v4()
        ;(await createImg(gallery, id + '.png'))
          .on('finish', async () => {
            event.galleries.push(id)
          })
          .on('error', () => {
            console.log('error')
          })
      }

      const id = v4()
      if (thumbnail && thumbnail.file) {
        ;(await createImg(thumbnail.file, id + '.png'))
          .on('finish', () => {
            event.thumbnail = id
            console.log('done')
          })
          .on('error', () => {
            console.log('error')
          })
      }
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
      return event
    } catch (error) {
      throw new ApolloError(JSON.stringify(error))
    }
  }
}
