import { Entity, Property } from 'mikro-orm'
import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseEntity } from './BaseEntity'
import { registerEnumType } from 'type-graphql'

@ObjectType()
@InputType('EventInformationInput')
export class Information {
  @Field()
  eventName: string

  @Field()
  description: string
}

export enum MemberInfoType {
  SECRET = 'secret',
  PUBLIC = 'public',
}

registerEnumType(MemberInfoType, {
  name: 'MemberInfoType', // this one is mandatory
  description: 'The type of member when join event: secret or public', // this one is optional
})

@InputType()
export class JoinEventInput {
  @Field(() => MemberInfoType)
  type: MemberInfoType

  @Field()
  eventId: string
}

@ObjectType()
@InputType('EventMemberInfoInput')
export class MemberInfo {
  @Field()
  id: string

  @Field({ description: 'secret or public' })
  type: MemberInfoType

  @Field()
  avatarId: string
}

@ObjectType()
@InputType('CoordInput')
export class Coord {
  @Field()
  longitude: number

  @Field()
  latitude: number
}

@ObjectType()
@InputType('EventPlaceInput')
export class Place {
  @Field()
  name: string

  @Field()
  address: string

  @Field()
  coord: Coord
}

@ObjectType()
@InputType('EventCreateInput')
@Entity()
export class Event extends BaseEntity {
  @Property()
  metaObject?: object

  @Property()
  metaArray?: any[]

  @Property()
  metaArrayOfStrings?: string[]

  @Field(() => String, { nullable: true })
  @Property()
  hostId?: string

  @Field(() => MemberInfo)
  @Property()
  membersInfo: MemberInfo[]

  @Field()
  @Property()
  startTime: Date

  @Field()
  @Property()
  endTime: Date

  @Field(() => String)
  @Property()
  tags: string[]

  @Field()
  @Property()
  place: Place

  @Field()
  @Property()
  information: Information

  @Field(() => String, { nullable: true })
  @Property()
  galleries: string[]

  @Field(() => String, { nullable: true })
  @Property()
  thumbnail: string
}
