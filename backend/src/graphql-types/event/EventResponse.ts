import { Field, ObjectType } from 'type-graphql'
import { Event } from '../../entity/Event'
import { User } from '../../entity'

@ObjectType()
export class EventWithHost extends Event {
  @Field(() => User, { nullable: true })
  hostInfo: User
}

@ObjectType()
export class GetEventByIdResponse extends Event {
  @Field()
  totalMember: number

  @Field(() => User, { nullable: true })
  hostInfo?: User

  constructor(event?: Event) {
    super()

    this.id = event!.id
    this.place = event!.place
    this.startTime = event!.startTime
    this.endTime = event!.endTime
    this.place = event!.place
    this.information = event!.information
    this.tags = event!.tags
    this.hostId = event!.hostId
    this.galleries = event!.galleries
    this.thumbnail = event!.thumbnail

    this.totalMember = event!.membersInfo.length
    this.isDeleted = event!.isDeleted

    // get member info
    this.membersInfo = []
  }
}
