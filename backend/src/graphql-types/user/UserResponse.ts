import { Field, ObjectType } from 'type-graphql'
import { Image } from '../../entity'
import { User } from '../../entity/User'

@ObjectType()
export class UserWithAvt extends User {
  @Field(() => Image, { nullable: true })
  avatar?: Image | null
}
