import { Field, ObjectType } from 'type-graphql'
import { EventTag } from '../../entity/EventTag'
import { FieldError } from '../FieldError'

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
