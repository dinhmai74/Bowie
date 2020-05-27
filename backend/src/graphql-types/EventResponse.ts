import { Field, ObjectType } from 'type-graphql'
import { User } from '../entity'
import { Event } from '../entity/Event'
import { FieldError } from './FieldError'

@ObjectType()
class EventWithHost extends Event {
  @Field(() => User, { nullable: true })
  hostInfo: User
}

@ObjectType()
export class EventResponse {
  @Field(() => Event, { nullable: true })
  event?: Event

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@ObjectType()
export class EventsResponse {
  @Field(() => [Event], { nullable: true })
  events?: Event[]

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@ObjectType()
export class EventsWithHostResponse {
  @Field(() => [EventWithHost], { nullable: true })
  events?: EventWithHost[]

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}
