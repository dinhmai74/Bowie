import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Event } from '../entity/Event'
import { User } from '../entity'

@ObjectType()
class EventWithHost extends Event {
  @Field(() => User)
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
