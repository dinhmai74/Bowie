import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { DI } from '../mikroconfig'
import { EventTagsResponse, EventTagResponse, ChangeQuantityTagInput } from '../graphql-types'
import { EventTag } from '../entity'

@Resolver()
export class EventTagResolver {
  @Query(() => EventTagsResponse)
  async getAllTag(): Promise<EventTagsResponse> {
    const eventTags = await DI.eventTagRepos.findAll()

    return { eventTags }
  }

  @Mutation(() => EventTagResponse)
  async createTag(@Arg('input') { name }: EventTag): Promise<EventTagResponse> {
    try {
      const tag = new EventTag()
      tag.name = name
      tag.currentUse = 0

      DI.eventTagRepos.persist(tag)

      return {
        eventTag: tag,
      }
    } catch (error) {
      return {
        errors: [
          {
            message: error,
            path: '',
          },
        ],
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
        errors: [
          {
            message: 'Cannot found id tag',
            path: 'change tag quantity',
          },
        ],
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
        errors: [
          {
            message: 'Cannot found id tag',
            path: 'change tag quantity',
          },
        ],
      }
    }

    tag.currentUse = increase ? tag.currentUse + 1 : tag.currentUse - 1
    DI.eventTagRepos.persist(tag)

    return {
      eventTag: tag,
    }
  }
}
