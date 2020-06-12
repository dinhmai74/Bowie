import { ApolloError } from 'apollo-server-express'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EventTag } from '../../entity'
import { ChangeQuantityTagInput } from '../../graphql-types'
import { DI } from '../../mikroconfig'
import { ErrorMess, removeStringDecoration } from '../../utils'
import { v4 } from 'uuid'
import { ObjectId } from 'mongodb'

@Resolver()
export class EventTagResolver {
  @Query(() => [EventTag])
  async getAllTag(): Promise<EventTag[]> {
    const eventTags = await DI.eventTagRepos.findAll()

    return eventTags
  }

  @Query(() => [EventTag])
  async getTopTenHotTag(): Promise<EventTag[]> {
    const eventTags = (await DI.eventTagRepos.findAll())
      .sort((a, b) => b.currentUse - a.currentUse)
      .slice(0, 9)

    return eventTags
  }

  @Mutation(() => EventTag)
  async createTag(@Arg('input') { name }: EventTag): Promise<EventTag> {
    try {
      const oldTag = await DI.eventTagRepos.findOne({ name })
      if (oldTag) return oldTag
      const tag = new EventTag()
      let formatedName = name
      if (formatedName[0] === '#') formatedName = formatedName.slice(0, 1)
      formatedName = formatedName.replace(' ', '')
      formatedName = removeStringDecoration(formatedName)
      tag.name = formatedName
      tag.currentUse = 0
      await DI.eventTagRepos.persist(tag)

      return { ...tag, id: tag._id + '' }
    } catch (error) {
      throw new ApolloError(JSON.stringify(error))
    }
  }

  @Mutation(() => EventTag)
  async changeTagQuantity(@Arg('input') { amount, id }: ChangeQuantityTagInput): Promise<EventTag> {
    const tag = await DI.eventTagRepos.findOne({ id })
    console.log('tag', tag)
    if (!tag) throw new ApolloError(ErrorMess.eventTag.cantFindId)
    tag.currentUse = amount
    DI.eventTagRepos.persist(tag)

    return tag
  }

  @Mutation(() => EventTag)
  async IncreaseOrDecreaseTagQuantity(
    @Arg('id') id: string,
    @Arg('increase') increase: boolean,
  ): Promise<EventTag> {
    const tag = await DI.eventTagRepos.findOne(id)
    if (!tag) throw new ApolloError(ErrorMess.eventTag.cantFindId)
    tag.currentUse = increase ? tag.currentUse + 1 : tag.currentUse - 1
    DI.eventTagRepos.persist(tag)

    return tag
  }
}
