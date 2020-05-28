import { ApolloError, UserInputError } from 'apollo-server-express'
import _ from 'lodash'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Event, JoinEventInput, MemberInfo } from '../../entity'
import { MyContext } from '../../graphql-types/MyContext'
import { isAuth } from '../../middleware/isAuth'
import { DI } from '../../mikroconfig'
import { ErrorMess } from '../../utils'

@Resolver()
export class InteractiveEventResolver {
  @Query(() => [Event], { nullable: true })
  @UseMiddleware(isAuth)
  async getMyJoinedEvent(@Ctx() ctx: MyContext): Promise<Event[] | null> {
    const userId = ctx.req!.session!.userId
    const user = await DI.userRepos.findOne(userId)
    if (!user?.joinedEvent) return null
    const events = await DI.eventRepos.find({
      id: { $in: user!.joinedEvent },
    })

    return events
  }

  @Query(() => [Event])
  @UseMiddleware(isAuth)
  async getMyHostedEvent(@Ctx() ctx: MyContext): Promise<Event[]> {
    const userId = ctx.req!.session!.userId
    const events = await DI.eventRepos.find({
      hostId: { $eq: userId },
    })

    return events
  }

  @Mutation(() => Event)
  @UseMiddleware(isAuth)
  async joinEvent(
    @Arg('input') { type, eventId }: JoinEventInput,
    @Ctx() ctx: MyContext,
  ): Promise<Event> {
    const event = await DI.eventRepos.findOne(eventId)
    if (!event) throw new ApolloError(ErrorMess.event.cantFindEvent)

    const userId = ctx.req!.session!.userId
    if (event.hostId === userId) throw new ApolloError(ErrorMess.event.sameHost)

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

    return event
  }

  @Mutation(() => Event)
  async editJoinTypeEventInfo(
    @Arg('input') { type, eventId }: JoinEventInput,
    @Ctx() ctx: MyContext,
  ): Promise<Event> {
    const event = await DI.eventRepos.findOne(eventId)
    if (!event) throw new UserInputError(ErrorMess.event.cantFindEvent)
    const userId = ctx.req!.session!.userId

    const memberInfo = event!.membersInfo.find((v) => v.id === userId)

    if (!memberInfo) throw new ApolloError(ErrorMess.event.notInEvent)

    memberInfo.type = type
    await DI.em.flush()

    return event
  }
}
