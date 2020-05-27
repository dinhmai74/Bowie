import { Field, ObjectType } from 'type-graphql'
import { Event } from '../entity/Event'
import { FieldError } from './FieldError'
import { UserWithAvt } from './UserResponse'

@ObjectType()
class EventWithHost extends Event {
  @Field(() => UserWithAvt, { nullable: true })
  hostInfo: UserWithAvt
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
