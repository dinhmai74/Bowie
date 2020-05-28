import { Resolver, Mutation, UseMiddleware, Arg, Ctx, Query } from 'type-graphql'
import _ from 'lodash'
import { EventResponse, EventsResponse } from '../../graphql-types'
import { isAuth } from '../../middleware/isAuth'
import { JoinEventInput, MemberInfo, Event } from '../../entity'
import { MyContext } from '../../graphql-types/MyContext'
import { DI } from '../../mikroconfig'

@Resolver()
export class InteractiveEventResolver {
  @Query(() => EventsResponse)
  @UseMiddleware(isAuth)
  async getMyJoinedEvent(@Ctx() ctx: MyContext): Promise<EventsResponse> {
    const userId = ctx.req!.session!.userId
    const user = await DI.userRepos.findOne(userId)
    const events = await DI.eventRepos.find({
      id: { $in: user!.joinedEvent },
    })

    return {
      events,
    }
  }

  @Query(() => EventsResponse)
  @UseMiddleware(isAuth)
  async getMyHostedEvent(@Ctx() ctx: MyContext): Promise<EventsResponse> {
    const userId = ctx.req!.session!.userId
    const events = await DI.eventRepos.find({
      hostId: { $eq: userId },
    })

    return {
      events,
    }
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth)
  async joinEvent(
    @Arg('input') { type, eventId }: JoinEventInput,
    @Ctx() ctx: MyContext,
  ): Promise<EventResponse> {
    const event = await DI.eventRepos.findOne(eventId)
    if (!event) return { error: { message: "Can't not find the event!", path: 'joinEvent' } }

    const userId = ctx.req!.session!.userId
    if (event.hostId === userId)
      return { error: { message: 'Did you hosted this event?', path: 'joinEvent' } }

    const user = await DI.userRepos.findOne(userId)
    const memberInfo = new MemberInfo()
    memberInfo.id = userId
    memberInfo.type = type

    if (!event.membersInfo) event.membersInfo = []
    event.membersInfo.push(memberInfo)
    event.membersInfo = _.uniqBy(event!.membersInfo, (info) => info.id)

    if (!user!.joinedEvent) user!.joinedEvent = []
    user!.joinedEvent.push(event!.id)

    await DI.em.flush()

    return {
      event,
    }
  }

  @Mutation(() => EventResponse)
  async editJoinTypeEventInfo(
    @Arg('input') { type, eventId }: JoinEventInput,
    @Ctx() ctx: MyContext,
  ): Promise<EventResponse> {
    const event = await DI.eventRepos.findOne(eventId)
    if (!event)
      return {
        error: { message: "Can't not find the event!", path: 'joinEvent' },
      }
    const userId = ctx.req!.session!.userId

    const memberInfo = event!.membersInfo.find((v) => v.id === userId)
    console.log('memberInfos', memberInfo)

    if (!memberInfo)
      return {
        error: { message: "You didn't in the event!", path: 'joinEvent' },
      }

    memberInfo.type = type
    await DI.em.flush()

    return {
      event,
    }
  }
}
