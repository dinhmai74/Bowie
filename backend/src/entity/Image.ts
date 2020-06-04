import { GraphQLScalarType, Kind } from 'graphql'
import { Entity, Property } from 'mikro-orm'
import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

export const BufferScalar = new GraphQLScalarType({
  name: 'Buffer',
  description: 'Buffer scalar type',
  parseValue(value: string) {
    return new Buffer(value) // value from the client input variables
  },
  serialize(value: Buffer) {
    return value // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Buffer(ast.value) // value from the client query
    }
    return null
  },
})

@ObjectType()
export class Image {
  @Field(() => BufferScalar)
  @Property()
  data: Buffer

  @Field()
  @Property()
  contentType: string
}
