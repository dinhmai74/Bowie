import { Field, ObjectType } from 'type-graphql'
import { Book } from '../entity/Book'
import { FieldError } from './FieldError'

@ObjectType()
export class BooksResponse {
  @Field(() => [Book], { nullable: true })
  books?: Book[]

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
