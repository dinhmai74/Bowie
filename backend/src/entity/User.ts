import { Entity, Property, Unique } from 'mikro-orm'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  @Unique()
  email: string

  @Field()
  @Property()
  name: string

  @Property()
  password: string

  @Property()
  metaObject?: object

  @Property()
  metaArray?: any[]

  @Property()
  metaArrayOfStrings?: string[]
}
