import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { EventTag } from '../../entity'
import { ChangeQuantityTagInput, EventTagResponse, EventTagsResponse } from '../../graphql-types'
import { DI } from '../../mikroconfig'
import { removeStringDecoration } from '../../utils'

@Resolver()
export class EventTagResolver {
  @Query(() => EventTagsResponse)
  async getAllTag(): Promise<EventTagsResponse> {
    const eventTags = await DI.eventTagRepos.findAll()

    return { eventTags }
  }

  @Query(() => EventTagsResponse)
  async getTopTenHotTag(): Promise<EventTagsResponse> {
    const eventTags = (await DI.eventTagRepos.findAll())
      .sort((a, b) => b.currentUse - a.currentUse)
      .slice(0, 9)

    return { eventTags }
  }

  @Mutation(() => EventTagResponse)
  async createTag(@Arg('input') { name }: EventTag): Promise<EventTagResponse> {
    try {
      const tag = new EventTag()
      let formatedName = name
      if (formatedName[0] === '#') formatedName = formatedName.slice(0, 1)
      formatedName = formatedName.replace(' ', '')
      formatedName = removeStringDecoration(formatedName)
      tag.name = formatedName
      tag.currentUse = 0

      DI.eventTagRepos.persist(tag)

      return {
        eventTag: tag,
      }
    } catch (error) {
      return {
        error: {
          message: error,
          path: '',
        },
      }
    }
  }

  @Mutation(() => EventTagResponse)
  async changeTagQuantity(
    @Arg('input') { amount, id }: ChangeQuantityTagInput,
  ): Promise<EventTagResponse> {
    const tag = await DI.eventTagRepos.findOne({ id })
    console.log('tag', tag)
    if (!tag) {
      return {
        error: {
          message: 'Cannot found id tag',
          path: 'change tag quantity',
        },
      }
    }

    tag.currentUse = amount
    DI.eventTagRepos.persist(tag)

    return {
      eventTag: tag,
    }
  }

  @Mutation(() => EventTagResponse)
  async IncreaseOrDecreaseTagQuantity(
    @Arg('id') id: string,
    @Arg('increase') increase: boolean,
  ): Promise<EventTagResponse> {
    const tag = await DI.eventTagRepos.findOne(id)
    if (!tag) {
      return {
        error: {
          message: 'Cannot found id tag',
          path: 'change tag quantity',
        },
      }
    }

    tag.currentUse = increase ? tag.currentUse + 1 : tag.currentUse - 1
    DI.eventTagRepos.persist(tag)

    return {
      eventTag: tag,
    }
  }
}
