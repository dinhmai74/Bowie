import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** Buffer scalar type */
  Buffer: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type AuthInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type BaseEntity = {
  __typename?: 'BaseEntity'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Book = {
  __typename?: 'Book'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  title: Scalars['String']
}

export type BooksResponse = {
  __typename?: 'BooksResponse'
  books?: Maybe<Array<Book>>
  errors?: Maybe<Array<FieldError>>
}

export type ChangeQuantityTagInput = {
  amount: Scalars['Float']
  id: Scalars['String']
}

export type Coord = {
  __typename?: 'Coord'
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type CoordInput = {
  longitude: Scalars['Float']
  latitude: Scalars['Float']
}

export type CustomGraphQlUpload = {
  file: Scalars['Upload']
}

export type CustomUpload = {
  __typename?: 'CustomUpload'
  file: Scalars['Upload']
}

export type Event = {
  __typename?: 'Event'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  hostId?: Maybe<Scalars['String']>
  membersInfo: Array<MemberInfo>
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  tags: Array<Scalars['String']>
  place: Place
  information: Information
  galleries?: Maybe<Array<Scalars['String']>>
  thumbnail?: Maybe<Scalars['String']>
}

export type EventCreateInput = {
  hostId?: Maybe<Scalars['String']>
  membersInfo: Array<EventMemberInfoInput>
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  tags: Array<Scalars['String']>
  place: EventPlaceInput
  information: EventInformationInput
  galleries?: Maybe<Array<Scalars['String']>>
  thumbnail?: Maybe<Scalars['String']>
}

export type EventInformationInput = {
  eventName: Scalars['String']
  description: Scalars['String']
}

export type EventInput = {
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  tags: Array<Scalars['String']>
  place: EventPlaceInput
  information: EventInformationInput
  galleries?: Maybe<UploadsInput>
  thumbnail?: Maybe<CustomGraphQlUpload>
}

export type EventMemberInfoInput = {
  id: Scalars['String']
  /** secret or public */
  type: Scalars['String']
}

export type EventPlaceInput = {
  name: Scalars['String']
  address: Scalars['String']
  coord: CoordInput
}

export type EventTag = {
  __typename?: 'EventTag'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  /** Current user use this tag for create event */
  currentUse: Scalars['Float']
}

export type EventTagInput = {
  name: Scalars['String']
  /** Current user use this tag for create event */
  currentUse: Scalars['Float']
}

export type EventWithHost = {
  __typename?: 'EventWithHost'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  hostId?: Maybe<Scalars['String']>
  membersInfo: Array<MemberInfo>
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  tags: Array<Scalars['String']>
  place: Place
  information: Information
  galleries?: Maybe<Array<Scalars['String']>>
  thumbnail?: Maybe<Scalars['String']>
  hostInfo?: Maybe<User>
}

export type FieldError = {
  __typename?: 'FieldError'
  path: Scalars['String']
  message: Scalars['String']
}

export type GetEventByIdResponse = {
  __typename?: 'GetEventByIdResponse'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  hostId?: Maybe<Scalars['String']>
  membersInfo: Array<MemberInfo>
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  tags: Array<Scalars['String']>
  place: Place
  information: Information
  galleries?: Maybe<Array<Scalars['String']>>
  thumbnail?: Maybe<Scalars['String']>
  totalMember: Scalars['Float']
  hostInfo?: Maybe<User>
}

export type Image = {
  __typename?: 'Image'
  data: Scalars['Buffer']
  contentType: Scalars['String']
}

export type Information = {
  __typename?: 'Information'
  eventName: Scalars['String']
  description: Scalars['String']
}

export type JoinEventInput = {
  type: MemberInfoType
  eventId: Scalars['String']
}

export type MemberInfo = {
  __typename?: 'MemberInfo'
  id: Scalars['String']
  /** secret or public */
  type: Scalars['String']
}

/** The type of member when join event: secret or public */
export enum MemberInfoType {
  SECRET = 'SECRET',
  PUBLIC = 'PUBLIC',
}

export type Mutation = {
  __typename?: 'Mutation'
  joinEvent: Event
  editJoinTypeEventInfo: Event
  createEvent: Event
  createTag: EventTag
  changeTagQuantity: EventTag
  IncreaseOrDecreaseTagQuantity: EventTag
  createPhoto: Scalars['Boolean']
  register: User
  login: User
  auth?: Maybe<User>
  logout: Scalars['Boolean']
  addProfilePicture: Scalars['Boolean']
}

export type MutationJoinEventArgs = {
  input: JoinEventInput
}

export type MutationEditJoinTypeEventInfoArgs = {
  input: JoinEventInput
}

export type MutationCreateEventArgs = {
  event: EventInput
}

export type MutationCreateTagArgs = {
  input: EventTagInput
}

export type MutationChangeTagQuantityArgs = {
  input: ChangeQuantityTagInput
}

export type MutationIncreaseOrDecreaseTagQuantityArgs = {
  increase: Scalars['Boolean']
  id: Scalars['String']
}

export type MutationCreatePhotoArgs = {
  input: Scalars['Upload']
}

export type MutationRegisterArgs = {
  input: SignUpInput
}

export type MutationLoginArgs = {
  input: AuthInput
}

export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload']
}

export type Place = {
  __typename?: 'Place'
  name: Scalars['String']
  address: Scalars['String']
  coord: Coord
}

export type Query = {
  __typename?: 'Query'
  getMyJoinedEvent?: Maybe<Array<Event>>
  getMyHostedEvent: Array<Event>
  book: Scalars['String']
  getBooks: BooksResponse
  getEvents: Array<Event>
  getEventById?: Maybe<GetEventByIdResponse>
  getEventBaseOnPos: Array<EventWithHost>
  testFunc: Scalars['Boolean']
  getAllTag: Array<EventTag>
  getTopTenHotTag: Array<EventTag>
  hello: Scalars['String']
  getImg: Image
  getAllUsers: Array<User>
  me?: Maybe<User>
}

export type QueryGetEventByIdArgs = {
  id: Scalars['String']
}

export type QueryGetEventBaseOnPosArgs = {
  input: CoordInput
}

export type QueryGetImgArgs = {
  id: Scalars['String']
}

export type SignUpInput = {
  email: Scalars['String']
  password: Scalars['String']
  name: Scalars['String']
}

export type Uploads = {
  __typename?: 'Uploads'
  files: Array<Scalars['Upload']>
}

export type UploadsInput = {
  files: Array<Scalars['Upload']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  email: Scalars['String']
  name: Scalars['String']
  avatarId?: Maybe<Scalars['String']>
  joinedEvent?: Maybe<Array<Scalars['String']>>
}

export type UserWithAvt = {
  __typename?: 'UserWithAvt'
  id: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  email: Scalars['String']
  name: Scalars['String']
  avatarId?: Maybe<Scalars['String']>
  joinedEvent?: Maybe<Array<Scalars['String']>>
  avatar?: Maybe<Image>
}

export type CreateEventTagsMutationVariables = {
  input: EventTagInput
}

export type CreateEventTagsMutation = { __typename?: 'Mutation' } & {
  createTag: { __typename?: 'EventTag' } & Pick<EventTag, 'name' | 'id'>
}

export type UpdateTagMutationVariables = {
  updateTagInput: ChangeQuantityTagInput
}

export type UpdateTagMutation = { __typename?: 'Mutation' } & {
  changeTagQuantity: { __typename?: 'EventTag' } & Pick<EventTag, 'name' | 'currentUse'>
}

export type ChangeTagQuantityMutationVariables = {
  increase: Scalars['Boolean']
  id: Scalars['String']
}

export type ChangeTagQuantityMutation = { __typename?: 'Mutation' } & {
  IncreaseOrDecreaseTagQuantity: { __typename?: 'EventTag' } & Pick<EventTag, 'name' | 'currentUse'>
}

export type GetAllTagQueryVariables = {}

export type GetAllTagQuery = { __typename?: 'Query' } & {
  getAllTag: Array<{ __typename?: 'EventTag' } & Pick<EventTag, 'id' | 'name' | 'currentUse'>>
}

export type GetTopTagsQueryVariables = {}

export type GetTopTagsQuery = { __typename?: 'Query' } & {
  getTopTenHotTag: Array<
    { __typename: 'EventTag' } & Pick<
      EventTag,
      'name' | 'currentUse' | 'id' | 'createdAt' | 'updatedAt'
    >
  >
}

export type LoginMutationVariables = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'User' } & Pick<
    User,
    'id' | 'name' | 'email' | 'createdAt' | 'updatedAt' | 'avatarId'
  >
}

export type SignUpMutationVariables = {
  email: Scalars['String']
  password: Scalars['String']
  name: Scalars['String']
}

export type SignUpMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<
    User,
    'id' | 'name' | 'email' | 'createdAt' | 'updatedAt' | 'avatarId'
  >
}

export type LogoutMutationVariables = {}

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>

export type AuthMutationVariables = {}

export type AuthMutation = { __typename?: 'Mutation' } & {
  auth?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'email' | 'name' | 'avatarId' | 'id' | 'createdAt' | 'updatedAt' | 'joinedEvent'
    >
  >
}

export type CreateEventMutationVariables = {
  event: EventInput
}

export type CreateEventMutation = { __typename?: 'Mutation' } & {
  createEvent: { __typename?: 'Event' } & Pick<Event, 'hostId'>
}

export type AddPictureMutationVariables = {
  file: Scalars['Upload']
}

export type AddPictureMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'addProfilePicture'>

export type JoinEventMutationVariables = {
  input: JoinEventInput
}

export type JoinEventMutation = { __typename?: 'Mutation' } & {
  joinEvent: { __typename?: 'Event' } & Pick<Event, 'id'> & {
      membersInfo: Array<{ __typename?: 'MemberInfo' } & Pick<MemberInfo, 'id' | 'type'>>
    }
}

export type EditJoinTypeEventInfoMutationVariables = {
  input: JoinEventInput
}

export type EditJoinTypeEventInfoMutation = { __typename?: 'Mutation' } & {
  editJoinTypeEventInfo: { __typename?: 'Event' } & Pick<Event, 'id'> & {
      membersInfo: Array<{ __typename?: 'MemberInfo' } & Pick<MemberInfo, 'id' | 'type'>>
    }
}

export type GetAllEventsQueryVariables = {}

export type GetAllEventsQuery = { __typename?: 'Query' } & {
  getEvents: Array<
    { __typename?: 'Event' } & Pick<
      Event,
      'id' | 'thumbnail' | 'galleries' | 'hostId' | 'endTime' | 'startTime'
    > & {
        membersInfo: Array<{ __typename?: 'MemberInfo' } & Pick<MemberInfo, 'id' | 'type'>>
        information: { __typename?: 'Information' } & Pick<Information, 'eventName' | 'description'>
        place: { __typename?: 'Place' } & Pick<Place, 'name' | 'address'> & {
            coord: { __typename?: 'Coord' } & Pick<Coord, 'latitude' | 'longitude'>
          }
      }
  >
}

export type GetEventByCoordQueryVariables = {
  input: CoordInput
}

export type GetEventByCoordQuery = { __typename?: 'Query' } & {
  getEventBaseOnPos: Array<
    { __typename?: 'EventWithHost' } & Pick<
      EventWithHost,
      'id' | 'tags' | 'thumbnail' | 'galleries' | 'endTime' | 'startTime'
    > & {
        hostInfo?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'avatarId'>>
        information: { __typename?: 'Information' } & Pick<Information, 'eventName'>
        place: { __typename?: 'Place' } & {
          coord: { __typename?: 'Coord' } & Pick<Coord, 'latitude' | 'longitude'>
        }
      }
  >
}

export type GetEventByIdQueryVariables = {
  id: Scalars['String']
}

export type GetEventByIdQuery = { __typename?: 'Query' } & {
  getEventById?: Maybe<
    { __typename?: 'GetEventByIdResponse' } & Pick<
      GetEventByIdResponse,
      'id' | 'thumbnail' | 'totalMember' | 'galleries' | 'endTime' | 'startTime'
    > & {
        hostInfo?: Maybe<{ __typename?: 'User' } & Pick<User, 'avatarId' | 'id'>>
        membersInfo: Array<{ __typename?: 'MemberInfo' } & Pick<MemberInfo, 'id' | 'type'>>
        information: { __typename?: 'Information' } & Pick<Information, 'eventName' | 'description'>
        place: { __typename?: 'Place' } & Pick<Place, 'name' | 'address'> & {
            coord: { __typename?: 'Coord' } & Pick<Coord, 'latitude' | 'longitude'>
          }
      }
  >
}

export type GetImgQueryVariables = {
  id: Scalars['String']
}

export type GetImgQuery = { __typename?: 'Query' } & {
  getImg: { __typename?: 'Image' } & Pick<Image, 'data'>
}

export type GetAllUsersQueryVariables = {}

export type GetAllUsersQuery = { __typename?: 'Query' } & {
  getAllUsers: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>
}

export type GetCurrentUserInfoQueryVariables = {}

export type GetCurrentUserInfoQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'email' | 'id' | 'avatarId' | 'name' | 'joinedEvent' | 'createdAt' | 'updatedAt'
    >
  >
}

export type GetMyJoinedEventQueryVariables = {}

export type GetMyJoinedEventQuery = { __typename?: 'Query' } & {
  getMyJoinedEvent?: Maybe<
    Array<
      { __typename?: 'Event' } & Pick<Event, 'id'> & {
          place: { __typename?: 'Place' } & Pick<Place, 'name' | 'address'>
        }
    >
  >
}

export type GetMyHostedEventQueryVariables = {}

export type GetMyHostedEventQuery = { __typename?: 'Query' } & {
  getMyHostedEvent: Array<
    { __typename?: 'Event' } & Pick<Event, 'id'> & {
        place: { __typename?: 'Place' } & Pick<Place, 'name' | 'address'>
      }
  >
}

export const CreateEventTagsDocument = gql`
  mutation createEventTags($input: EventTagInput!) {
    createTag(input: $input) {
      name
      id
    }
  }
`
export type CreateEventTagsMutationFn = ApolloReactCommon.MutationFunction<
  CreateEventTagsMutation,
  CreateEventTagsMutationVariables
>

/**
 * __useCreateEventTagsMutation__
 *
 * To run a mutation, you first call `useCreateEventTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventTagsMutation, { data, loading, error }] = useCreateEventTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventTagsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateEventTagsMutation,
    CreateEventTagsMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateEventTagsMutation, CreateEventTagsMutationVariables>(
    CreateEventTagsDocument,
    baseOptions,
  )
}
export type CreateEventTagsMutationHookResult = ReturnType<typeof useCreateEventTagsMutation>
export type CreateEventTagsMutationResult = ApolloReactCommon.MutationResult<
  CreateEventTagsMutation
>
export type CreateEventTagsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateEventTagsMutation,
  CreateEventTagsMutationVariables
>
export const UpdateTagDocument = gql`
  mutation updateTag($updateTagInput: ChangeQuantityTagInput!) {
    changeTagQuantity(input: $updateTagInput) {
      name
      currentUse
    }
  }
`
export type UpdateTagMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTagMutation,
  UpdateTagMutationVariables
>

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      updateTagInput: // value for 'updateTagInput'
 *   },
 * });
 */
export function useUpdateTagMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(
    UpdateTagDocument,
    baseOptions,
  )
}
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>
export type UpdateTagMutationResult = ApolloReactCommon.MutationResult<UpdateTagMutation>
export type UpdateTagMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTagMutation,
  UpdateTagMutationVariables
>
export const ChangeTagQuantityDocument = gql`
  mutation changeTagQuantity($increase: Boolean!, $id: String!) {
    IncreaseOrDecreaseTagQuantity(increase: $increase, id: $id) {
      name
      currentUse
    }
  }
`
export type ChangeTagQuantityMutationFn = ApolloReactCommon.MutationFunction<
  ChangeTagQuantityMutation,
  ChangeTagQuantityMutationVariables
>

/**
 * __useChangeTagQuantityMutation__
 *
 * To run a mutation, you first call `useChangeTagQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTagQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTagQuantityMutation, { data, loading, error }] = useChangeTagQuantityMutation({
 *   variables: {
 *      increase: // value for 'increase'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChangeTagQuantityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeTagQuantityMutation,
    ChangeTagQuantityMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ChangeTagQuantityMutation,
    ChangeTagQuantityMutationVariables
  >(ChangeTagQuantityDocument, baseOptions)
}
export type ChangeTagQuantityMutationHookResult = ReturnType<typeof useChangeTagQuantityMutation>
export type ChangeTagQuantityMutationResult = ApolloReactCommon.MutationResult<
  ChangeTagQuantityMutation
>
export type ChangeTagQuantityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeTagQuantityMutation,
  ChangeTagQuantityMutationVariables
>
export const GetAllTagDocument = gql`
  query getAllTag {
    getAllTag {
      id
      name
      currentUse
    }
  }
`

/**
 * __useGetAllTagQuery__
 *
 * To run a query within a React component, call `useGetAllTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllTagQuery, GetAllTagQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetAllTagQuery, GetAllTagQueryVariables>(
    GetAllTagDocument,
    baseOptions,
  )
}
export function useGetAllTagLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllTagQuery, GetAllTagQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetAllTagQuery, GetAllTagQueryVariables>(
    GetAllTagDocument,
    baseOptions,
  )
}
export type GetAllTagQueryHookResult = ReturnType<typeof useGetAllTagQuery>
export type GetAllTagLazyQueryHookResult = ReturnType<typeof useGetAllTagLazyQuery>
export type GetAllTagQueryResult = ApolloReactCommon.QueryResult<
  GetAllTagQuery,
  GetAllTagQueryVariables
>
export function refetchGetAllTagQuery(variables?: GetAllTagQueryVariables) {
  return { query: GetAllTagDocument, variables: variables }
}
export const GetTopTagsDocument = gql`
  query getTopTags {
    getTopTenHotTag {
      name
      currentUse
      id
      createdAt
      updatedAt
      __typename
    }
  }
`

/**
 * __useGetTopTagsQuery__
 *
 * To run a query within a React component, call `useGetTopTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopTagsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopTagsQuery, GetTopTagsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetTopTagsQuery, GetTopTagsQueryVariables>(
    GetTopTagsDocument,
    baseOptions,
  )
}
export function useGetTopTagsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopTagsQuery, GetTopTagsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetTopTagsQuery, GetTopTagsQueryVariables>(
    GetTopTagsDocument,
    baseOptions,
  )
}
export type GetTopTagsQueryHookResult = ReturnType<typeof useGetTopTagsQuery>
export type GetTopTagsLazyQueryHookResult = ReturnType<typeof useGetTopTagsLazyQuery>
export type GetTopTagsQueryResult = ApolloReactCommon.QueryResult<
  GetTopTagsQuery,
  GetTopTagsQueryVariables
>
export function refetchGetTopTagsQuery(variables?: GetTopTagsQueryVariables) {
  return { query: GetTopTagsDocument, variables: variables }
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      name
      email
      createdAt
      updatedAt
      avatarId
    }
  }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const SignUpDocument = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    register(input: { email: $email, password: $password, name: $name }) {
      id
      name
      email
      createdAt
      updatedAt
      avatarId
    }
  }
`
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions,
  )
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const AuthDocument = gql`
  mutation auth {
    auth {
      email
      name
      avatarId
      id
      createdAt
      updatedAt
      joinedEvent
    }
  }
`
export type AuthMutationFn = ApolloReactCommon.MutationFunction<AuthMutation, AuthMutationVariables>

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useAuthMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<AuthMutation, AuthMutationVariables>,
) {
  return ApolloReactHooks.useMutation<AuthMutation, AuthMutationVariables>(
    AuthDocument,
    baseOptions,
  )
}
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>
export type AuthMutationResult = ApolloReactCommon.MutationResult<AuthMutation>
export type AuthMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AuthMutation,
  AuthMutationVariables
>
export const CreateEventDocument = gql`
  mutation createEvent($event: EventInput!) {
    createEvent(event: $event) {
      hostId
    }
  }
`
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    baseOptions,
  )
}
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>
export const AddPictureDocument = gql`
  mutation addPicture($file: Upload!) {
    addProfilePicture(picture: $file)
  }
`
export type AddPictureMutationFn = ApolloReactCommon.MutationFunction<
  AddPictureMutation,
  AddPictureMutationVariables
>

/**
 * __useAddPictureMutation__
 *
 * To run a mutation, you first call `useAddPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPictureMutation, { data, loading, error }] = useAddPictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddPictureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddPictureMutation,
    AddPictureMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<AddPictureMutation, AddPictureMutationVariables>(
    AddPictureDocument,
    baseOptions,
  )
}
export type AddPictureMutationHookResult = ReturnType<typeof useAddPictureMutation>
export type AddPictureMutationResult = ApolloReactCommon.MutationResult<AddPictureMutation>
export type AddPictureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddPictureMutation,
  AddPictureMutationVariables
>
export const JoinEventDocument = gql`
  mutation joinEvent($input: JoinEventInput!) {
    joinEvent(input: $input) {
      id
      membersInfo {
        id
        type
      }
    }
  }
`
export type JoinEventMutationFn = ApolloReactCommon.MutationFunction<
  JoinEventMutation,
  JoinEventMutationVariables
>

/**
 * __useJoinEventMutation__
 *
 * To run a mutation, you first call `useJoinEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinEventMutation, { data, loading, error }] = useJoinEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<JoinEventMutation, JoinEventMutationVariables>,
) {
  return ApolloReactHooks.useMutation<JoinEventMutation, JoinEventMutationVariables>(
    JoinEventDocument,
    baseOptions,
  )
}
export type JoinEventMutationHookResult = ReturnType<typeof useJoinEventMutation>
export type JoinEventMutationResult = ApolloReactCommon.MutationResult<JoinEventMutation>
export type JoinEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  JoinEventMutation,
  JoinEventMutationVariables
>
export const EditJoinTypeEventInfoDocument = gql`
  mutation editJoinTypeEventInfo($input: JoinEventInput!) {
    editJoinTypeEventInfo(input: $input) {
      id
      membersInfo {
        id
        type
      }
    }
  }
`
export type EditJoinTypeEventInfoMutationFn = ApolloReactCommon.MutationFunction<
  EditJoinTypeEventInfoMutation,
  EditJoinTypeEventInfoMutationVariables
>

/**
 * __useEditJoinTypeEventInfoMutation__
 *
 * To run a mutation, you first call `useEditJoinTypeEventInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditJoinTypeEventInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editJoinTypeEventInfoMutation, { data, loading, error }] = useEditJoinTypeEventInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditJoinTypeEventInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditJoinTypeEventInfoMutation,
    EditJoinTypeEventInfoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditJoinTypeEventInfoMutation,
    EditJoinTypeEventInfoMutationVariables
  >(EditJoinTypeEventInfoDocument, baseOptions)
}
export type EditJoinTypeEventInfoMutationHookResult = ReturnType<
  typeof useEditJoinTypeEventInfoMutation
>
export type EditJoinTypeEventInfoMutationResult = ApolloReactCommon.MutationResult<
  EditJoinTypeEventInfoMutation
>
export type EditJoinTypeEventInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditJoinTypeEventInfoMutation,
  EditJoinTypeEventInfoMutationVariables
>
export const GetAllEventsDocument = gql`
  query getAllEvents {
    getEvents {
      id
      thumbnail
      galleries
      hostId
      membersInfo {
        id
        type
      }
      endTime
      startTime
      information {
        eventName
        description
      }
      place {
        name
        address
        coord {
          latitude
          longitude
        }
      }
    }
  }
`

/**
 * __useGetAllEventsQuery__
 *
 * To run a query within a React component, call `useGetAllEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(
    GetAllEventsDocument,
    baseOptions,
  )
}
export function useGetAllEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllEventsQuery,
    GetAllEventsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(
    GetAllEventsDocument,
    baseOptions,
  )
}
export type GetAllEventsQueryHookResult = ReturnType<typeof useGetAllEventsQuery>
export type GetAllEventsLazyQueryHookResult = ReturnType<typeof useGetAllEventsLazyQuery>
export type GetAllEventsQueryResult = ApolloReactCommon.QueryResult<
  GetAllEventsQuery,
  GetAllEventsQueryVariables
>
export function refetchGetAllEventsQuery(variables?: GetAllEventsQueryVariables) {
  return { query: GetAllEventsDocument, variables: variables }
}
export const GetEventByCoordDocument = gql`
  query getEventByCoord($input: CoordInput!) {
    getEventBaseOnPos(input: $input) {
      id
      tags
      thumbnail
      galleries
      hostInfo {
        id
        name
        email
        avatarId
      }
      endTime
      startTime
      information {
        eventName
      }
      place {
        coord {
          latitude
          longitude
        }
      }
    }
  }
`

/**
 * __useGetEventByCoordQuery__
 *
 * To run a query within a React component, call `useGetEventByCoordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByCoordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByCoordQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventByCoordQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetEventByCoordQuery,
    GetEventByCoordQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetEventByCoordQuery, GetEventByCoordQueryVariables>(
    GetEventByCoordDocument,
    baseOptions,
  )
}
export function useGetEventByCoordLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetEventByCoordQuery,
    GetEventByCoordQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetEventByCoordQuery, GetEventByCoordQueryVariables>(
    GetEventByCoordDocument,
    baseOptions,
  )
}
export type GetEventByCoordQueryHookResult = ReturnType<typeof useGetEventByCoordQuery>
export type GetEventByCoordLazyQueryHookResult = ReturnType<typeof useGetEventByCoordLazyQuery>
export type GetEventByCoordQueryResult = ApolloReactCommon.QueryResult<
  GetEventByCoordQuery,
  GetEventByCoordQueryVariables
>
export function refetchGetEventByCoordQuery(variables?: GetEventByCoordQueryVariables) {
  return { query: GetEventByCoordDocument, variables: variables }
}
export const GetEventByIdDocument = gql`
  query getEventById($id: String!) {
    getEventById(id: $id) {
      id
      thumbnail
      totalMember
      galleries
      hostInfo {
        avatarId
        id
      }
      membersInfo {
        id
        type
      }
      endTime
      startTime
      information {
        eventName
        description
      }
      place {
        name
        address
        coord {
          latitude
          longitude
        }
      }
    }
  }
`

/**
 * __useGetEventByIdQuery__
 *
 * To run a query within a React component, call `useGetEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
    GetEventByIdDocument,
    baseOptions,
  )
}
export function useGetEventByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetEventByIdQuery,
    GetEventByIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(
    GetEventByIdDocument,
    baseOptions,
  )
}
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>
export type GetEventByIdQueryResult = ApolloReactCommon.QueryResult<
  GetEventByIdQuery,
  GetEventByIdQueryVariables
>
export function refetchGetEventByIdQuery(variables?: GetEventByIdQueryVariables) {
  return { query: GetEventByIdDocument, variables: variables }
}
export const GetImgDocument = gql`
  query getImg($id: String!) {
    getImg(id: $id) {
      data
    }
  }
`

/**
 * __useGetImgQuery__
 *
 * To run a query within a React component, call `useGetImgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImgQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetImgQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetImgQuery, GetImgQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetImgQuery, GetImgQueryVariables>(GetImgDocument, baseOptions)
}
export function useGetImgLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetImgQuery, GetImgQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetImgQuery, GetImgQueryVariables>(
    GetImgDocument,
    baseOptions,
  )
}
export type GetImgQueryHookResult = ReturnType<typeof useGetImgQuery>
export type GetImgLazyQueryHookResult = ReturnType<typeof useGetImgLazyQuery>
export type GetImgQueryResult = ApolloReactCommon.QueryResult<GetImgQuery, GetImgQueryVariables>
export function refetchGetImgQuery(variables?: GetImgQueryVariables) {
  return { query: GetImgDocument, variables: variables }
}
export const GetAllUsersDocument = gql`
  query getAllUsers {
    getAllUsers {
      id
      email
    }
  }
`

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    baseOptions,
  )
}
export function useGetAllUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    baseOptions,
  )
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>
export type GetAllUsersQueryResult = ApolloReactCommon.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>
export function refetchGetAllUsersQuery(variables?: GetAllUsersQueryVariables) {
  return { query: GetAllUsersDocument, variables: variables }
}
export const GetCurrentUserInfoDocument = gql`
  query getCurrentUserInfo {
    me {
      email
      id
      avatarId
      name
      joinedEvent
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetCurrentUserInfoQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCurrentUserInfoQuery,
    GetCurrentUserInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(
    GetCurrentUserInfoDocument,
    baseOptions,
  )
}
export function useGetCurrentUserInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCurrentUserInfoQuery,
    GetCurrentUserInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(
    GetCurrentUserInfoDocument,
    baseOptions,
  )
}
export type GetCurrentUserInfoQueryHookResult = ReturnType<typeof useGetCurrentUserInfoQuery>
export type GetCurrentUserInfoLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserInfoLazyQuery
>
export type GetCurrentUserInfoQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentUserInfoQuery,
  GetCurrentUserInfoQueryVariables
>
export function refetchGetCurrentUserInfoQuery(variables?: GetCurrentUserInfoQueryVariables) {
  return { query: GetCurrentUserInfoDocument, variables: variables }
}
export const GetMyJoinedEventDocument = gql`
  query getMyJoinedEvent {
    getMyJoinedEvent {
      id
      place {
        name
        address
      }
    }
  }
`

/**
 * __useGetMyJoinedEventQuery__
 *
 * To run a query within a React component, call `useGetMyJoinedEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyJoinedEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyJoinedEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyJoinedEventQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMyJoinedEventQuery,
    GetMyJoinedEventQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetMyJoinedEventQuery, GetMyJoinedEventQueryVariables>(
    GetMyJoinedEventDocument,
    baseOptions,
  )
}
export function useGetMyJoinedEventLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyJoinedEventQuery,
    GetMyJoinedEventQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetMyJoinedEventQuery, GetMyJoinedEventQueryVariables>(
    GetMyJoinedEventDocument,
    baseOptions,
  )
}
export type GetMyJoinedEventQueryHookResult = ReturnType<typeof useGetMyJoinedEventQuery>
export type GetMyJoinedEventLazyQueryHookResult = ReturnType<typeof useGetMyJoinedEventLazyQuery>
export type GetMyJoinedEventQueryResult = ApolloReactCommon.QueryResult<
  GetMyJoinedEventQuery,
  GetMyJoinedEventQueryVariables
>
export function refetchGetMyJoinedEventQuery(variables?: GetMyJoinedEventQueryVariables) {
  return { query: GetMyJoinedEventDocument, variables: variables }
}
export const GetMyHostedEventDocument = gql`
  query getMyHostedEvent {
    getMyHostedEvent {
      id
      place {
        name
        address
      }
    }
  }
`

/**
 * __useGetMyHostedEventQuery__
 *
 * To run a query within a React component, call `useGetMyHostedEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyHostedEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyHostedEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyHostedEventQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMyHostedEventQuery,
    GetMyHostedEventQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetMyHostedEventQuery, GetMyHostedEventQueryVariables>(
    GetMyHostedEventDocument,
    baseOptions,
  )
}
export function useGetMyHostedEventLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyHostedEventQuery,
    GetMyHostedEventQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetMyHostedEventQuery, GetMyHostedEventQueryVariables>(
    GetMyHostedEventDocument,
    baseOptions,
  )
}
export type GetMyHostedEventQueryHookResult = ReturnType<typeof useGetMyHostedEventQuery>
export type GetMyHostedEventLazyQueryHookResult = ReturnType<typeof useGetMyHostedEventLazyQuery>
export type GetMyHostedEventQueryResult = ApolloReactCommon.QueryResult<
  GetMyHostedEventQuery,
  GetMyHostedEventQueryVariables
>
export function refetchGetMyHostedEventQuery(variables?: GetMyHostedEventQueryVariables) {
  return { query: GetMyHostedEventDocument, variables: variables }
}
