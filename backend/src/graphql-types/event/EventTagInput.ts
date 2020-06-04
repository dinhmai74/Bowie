import { InputType, Field } from 'type-graphql'

@InputType()
export class ChangeQuantityTagInput {
  @Field()
  amount: number

  @Field()
  id: string
}
