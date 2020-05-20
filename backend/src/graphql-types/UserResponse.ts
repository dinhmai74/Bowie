import { Field, ObjectType } from 'type-graphql'
import { User } from '../entity/User'
import { FieldError } from './FieldError'

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@ObjectType()
export class UsersResponse {
  @Field(() => [User], { nullable: true })
  users?: User[]

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
