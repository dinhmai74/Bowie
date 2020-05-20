import { MongoEntity, PrimaryKey, Property, SerializedPrimaryKey } from 'mikro-orm'
import { ObjectID } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export abstract class BaseEntity implements MongoEntity<BaseEntity> {
  @PrimaryKey()
  _id!: ObjectID

  @SerializedPrimaryKey()
  @Field()
  id!: string

  @Property()
  @Field(() => Date)
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt = new Date()
}
