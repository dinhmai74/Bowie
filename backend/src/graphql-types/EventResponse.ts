import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Event } from '../entity/Event'

@ObjectType()
export class EventResponse {
  @Field(() => Event, { nullable: true })
  event?: Event

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@ObjectType()
export class EventsResponse {
  @Field(() => [Event], { nullable: true })
  events?: Event[]

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
