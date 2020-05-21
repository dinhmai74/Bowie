import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { EventTag } from '../entity/EventTag'

@ObjectType()
export class EventTagResponse {
  @Field(() => EventTag, { nullable: true })
  eventTag?: EventTag

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@ObjectType()
export class EventTagsResponse {
  @Field(() => [EventTag], { nullable: true })
  eventTags?: EventTag[]

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}
