import { Entity, Property, Unique } from 'mikro-orm'
import { Field, ObjectType, InputType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'

@ObjectType()
@Entity()
@InputType('EventTagInput')
export class EventTag extends BaseEntity {
  @Property()
  metaObject?: object

  @Property()
  metaArray?: any[]

  @Property()
  metaArrayOfStrings?: string[]

  @Field()
  @Property()
  @Unique()
  name: string

  @Field({ description: 'Current user use this tag for create event' })
  @Property()
  currentUse: number
}
