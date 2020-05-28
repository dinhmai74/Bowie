import { Field, ObjectType } from 'type-graphql'
import { Image } from '../../entity'
import { User } from '../../entity/User'
import { FieldError } from '../FieldError'

@ObjectType()
export class UserWithAvt extends User {
  @Field(() => Image, { nullable: true })
  avatar?: Image | null
}

@ObjectType()
export class UserWithAvtResponse {
  @Field(() => UserWithAvt, { nullable: true })
  user?: UserWithAvt | null

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User | null

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}

@ObjectType()
export class UsersResponse {
  @Field(() => [User], { nullable: true })
  users?: User[]

  @Field(() => FieldError, { nullable: true })
  error?: FieldError
}
