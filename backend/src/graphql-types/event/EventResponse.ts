import { Field, ObjectType } from 'type-graphql'
import { Event } from '../../entity/Event'
import { User } from '../../entity'

@ObjectType()
export class EventWithHost extends Event {
  @Field(() => User, { nullable: true })
  hostInfo: User
}

@ObjectType()
export class GetEventByIdResponse extends Event {
  @Field()
  totalMember: number

  @Field(() => User, { nullable: true })
  hostInfo?: User
}
