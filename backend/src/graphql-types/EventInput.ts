import { InputType, Field } from 'type-graphql'

@InputType()
export class EventInput {
  @Field()
  email: string

  @Field()
  password: string
}
