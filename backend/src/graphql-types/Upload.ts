import { Stream } from 'stream'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
@InputType('CustomGraphQLUpload')
export class CustomUpload {
  @Field(() => GraphQLUpload)
  file: FileUpload
}

@ObjectType()
@InputType('UploadsInput')
export class Uploads {
  @Field(() => [GraphQLUpload])
  files: FileUpload[]
}
