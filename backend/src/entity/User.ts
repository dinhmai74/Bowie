import { Entity, Property, Unique } from 'mikro-orm'
import { Field, ObjectType } from 'type-graphql'
import { Image } from '../graphql-types/Image'
import { BaseEntity } from './BaseEntity'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Property()
  metaObject?: object

  @Property()
  metaArray?: any[]

  @Property()
  metaArrayOfStrings?: string[]

  @Field()
  @Property()
  @Unique()
  email: string

  @Field()
  @Property()
  name: string

  @Field(() => Image)
  @Property()
  avatar: Image

  @Property()
  password: string
}
