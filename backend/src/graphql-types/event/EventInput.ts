import { Field, InputType } from 'type-graphql'
import { Information, MemberInfo, Place } from '../../entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Uploads, CustomUpload } from '../Upload'

@InputType()
export class EventInput {
  @Field(() => MemberInfo)
  membersInfo: MemberInfo[]

  @Field()
  startTime: Date

  @Field()
  endTime: Date

  @Field(() => String)
  tags: string[]

  @Field()
  place: Place

  @Field()
  information: Information

  @Field(() => Uploads)
  galleries: Uploads

  @Field(() => CustomUpload)
  thumbnail: CustomUpload
}
