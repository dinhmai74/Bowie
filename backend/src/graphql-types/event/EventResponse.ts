import { Field, ObjectType } from 'type-graphql'
import { Event } from '../../entity/Event'
import { UserWithAvt } from '../user/UserResponse'

@ObjectType()
export class EventWithHost extends Event {
  @Field(() => UserWithAvt, { nullable: true })
  hostInfo: UserWithAvt
}
