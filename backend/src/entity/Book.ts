import { Entity, Property } from 'mikro-orm'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field()
  @Property()
  title: string

  @Property()
  metaObject?: object

  @Property()
  metaArray?: any[]

  @Property()
  metaArrayOfStrings?: string[]

  constructor(title: string) {
    super()
    this.title = title
  }
}
