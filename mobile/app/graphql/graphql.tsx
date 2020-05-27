import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Buffer scalar type */
  Buffer: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type BaseEntity = {
  __typename?: 'BaseEntity';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type BooksResponse = {
  __typename?: 'BooksResponse';
  books?: Maybe<Array<Book>>;
  errors?: Maybe<Array<FieldError>>;
};


export type ChangeQuantityTagInput = {
  amount: Scalars['Float'];
  id: Scalars['String'];
};

export type Coord = {
  __typename?: 'Coord';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type CoordInput = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};


export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  hostId?: Maybe<Scalars['String']>;
  membersInfo: Array<MemberInfo>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
  place: Place;
  information: Information;
};

export type EventCreateInput = {
  hostId?: Maybe<Scalars['String']>;
  membersInfo: Array<EventMemberInfoInput>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
  place: EventPlaceInput;
  information: EventInformationInput;
};

export type EventInformationInput = {
  eventName: Scalars['String'];
  description: Scalars['String'];
};

export type EventInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EventMemberInfoInput = {
  id: Scalars['String'];
  /** secret or public */
  type: Scalars['String'];
};

export type EventPlaceInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  coord: CoordInput;
};

export type EventResponse = {
  __typename?: 'EventResponse';
  event?: Maybe<Event>;
  error?: Maybe<FieldError>;
};

export type EventsResponse = {
  __typename?: 'EventsResponse';
  events?: Maybe<Array<Event>>;
  error?: Maybe<FieldError>;
};

export type EventsWithHostResponse = {
  __typename?: 'EventsWithHostResponse';
  events?: Maybe<Array<EventWithHost>>;
  error?: Maybe<FieldError>;
};

export type EventTag = {
  __typename?: 'EventTag';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  /** Current user use this tag for create event */
  currentUse: Scalars['Float'];
};

export type EventTagInput = {
  name: Scalars['String'];
  /** Current user use this tag for create event */
  currentUse: Scalars['Float'];
};

export type EventTagResponse = {
  __typename?: 'EventTagResponse';
  eventTag?: Maybe<EventTag>;
  error?: Maybe<FieldError>;
};

export type EventTagsResponse = {
  __typename?: 'EventTagsResponse';
  eventTags?: Maybe<Array<EventTag>>;
  error?: Maybe<FieldError>;
};

export type EventWithHost = {
  __typename?: 'EventWithHost';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  hostId?: Maybe<Scalars['String']>;
  membersInfo: Array<MemberInfo>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
  place: Place;
  information: Information;
  hostInfo?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  data: Scalars['Buffer'];
  contentType: Scalars['String'];
};

export type ImageInput = {
  data: Scalars['Buffer'];
  contentType: Scalars['String'];
};

export type Information = {
  __typename?: 'Information';
  eventName: Scalars['String'];
  description: Scalars['String'];
};

export type MemberInfo = {
  __typename?: 'MemberInfo';
  id: Scalars['String'];
  /** secret or public */
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: EventResponse;
  createTag: EventTagResponse;
  changeTagQuantity: EventTagResponse;
  IncreaseOrDecreaseTagQuantity: EventTagResponse;
  register: UserResponse;
  login: UserResponse;
  auth?: Maybe<User>;
  logout: Scalars['Boolean'];
  addProfilePicture: Scalars['Boolean'];
};


export type MutationCreateEventArgs = {
  input: EventCreateInput;
};


export type MutationCreateTagArgs = {
  input: EventTagInput;
};


export type MutationChangeTagQuantityArgs = {
  input: ChangeQuantityTagInput;
};


export type MutationIncreaseOrDecreaseTagQuantityArgs = {
  increase: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: SignUpInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
};

export type Place = {
  __typename?: 'Place';
  name: Scalars['String'];
  address: Scalars['String'];
  coord: Coord;
};

export type Query = {
  __typename?: 'Query';
  book: Scalars['String'];
  getBooks: BooksResponse;
  getEvents: EventsResponse;
  getEventById: EventResponse;
  getEventBaseOnPos: EventsWithHostResponse;
  getAllTag: EventTagsResponse;
  hello: Scalars['String'];
  getAllUsers: UsersResponse;
  me?: Maybe<UserWithAvtResponse>;
};


export type QueryGetEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetEventBaseOnPosArgs = {
  input: CoordInput;
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  avatarId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  error?: Maybe<FieldError>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  users?: Maybe<Array<User>>;
  error?: Maybe<FieldError>;
};

export type UserWithAvt = {
  __typename?: 'UserWithAvt';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  avatarId: Scalars['String'];
  avatar?: Maybe<Image>;
};

export type UserWithAvtResponse = {
  __typename?: 'UserWithAvtResponse';
  user?: Maybe<UserWithAvt>;
  error?: Maybe<FieldError>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )> }
  ) }
);

export type SignUpMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'name'>
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )> }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type AuthMutationVariables = {};


export type AuthMutation = (
  { __typename?: 'Mutation' }
  & { auth?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'name'>
  )> }
);

export type AddPictureMutationVariables = {
  file: Scalars['Upload'];
};


export type AddPictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProfilePicture'>
);

export type GetAllEventsQueryVariables = {};


export type GetAllEventsQuery = (
  { __typename?: 'Query' }
  & { getEvents: (
    { __typename?: 'EventsResponse' }
    & { events?: Maybe<Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'hostId' | 'endTime' | 'startTime'>
      & { membersInfo: Array<(
        { __typename?: 'MemberInfo' }
        & Pick<MemberInfo, 'id' | 'type'>
      )>, information: (
        { __typename?: 'Information' }
        & Pick<Information, 'eventName' | 'description'>
      ), place: (
        { __typename?: 'Place' }
        & Pick<Place, 'name' | 'address'>
        & { coord: (
          { __typename?: 'Coord' }
          & Pick<Coord, 'latitude' | 'longitude'>
        ) }
      ) }
    )>>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )> }
  ) }
);

export type GetEventByCoordQueryVariables = {
  input: CoordInput;
};


export type GetEventByCoordQuery = (
  { __typename?: 'Query' }
  & { getEventBaseOnPos: (
    { __typename?: 'EventsWithHostResponse' }
    & { events?: Maybe<Array<(
      { __typename?: 'EventWithHost' }
      & Pick<EventWithHost, 'id' | 'endTime' | 'startTime'>
      & { hostInfo?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'email'>
      )>, information: (
        { __typename?: 'Information' }
        & Pick<Information, 'eventName'>
      ), place: (
        { __typename?: 'Place' }
        & { coord: (
          { __typename?: 'Coord' }
          & Pick<Coord, 'latitude' | 'longitude'>
        ) }
      ) }
    )>>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )> }
  ) }
);

export type GetEventByIdQueryVariables = {
  id: Scalars['String'];
};


export type GetEventByIdQuery = (
  { __typename?: 'Query' }
  & { getEventById: (
    { __typename?: 'EventResponse' }
    & { event?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'hostId' | 'endTime' | 'startTime'>
      & { membersInfo: Array<(
        { __typename?: 'MemberInfo' }
        & Pick<MemberInfo, 'id' | 'type'>
      )>, information: (
        { __typename?: 'Information' }
        & Pick<Information, 'eventName' | 'description'>
      ), place: (
        { __typename?: 'Place' }
        & Pick<Place, 'name' | 'address'>
        & { coord: (
          { __typename?: 'Coord' }
          & Pick<Coord, 'latitude' | 'longitude'>
        ) }
      ) }
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )> }
  ) }
);

export type GetAllUsersQueryVariables = {};


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: (
    { __typename?: 'UsersResponse' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )>>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message' | 'path'>
    )> }
  ) }
);

export type GetCurrentUserInfoQueryVariables = {};


export type GetCurrentUserInfoQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserWithAvtResponse' }
    & { user?: Maybe<(
      { __typename?: 'UserWithAvt' }
      & Pick<UserWithAvt, 'email' | 'id' | 'name' | 'avatarId'>
      & { avatar?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'data' | 'contentType'>
      )> }
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )> }
  )> }
);


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      email
    }
    error {
      message
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $password: String!, $name: String!) {
  register(input: {email: $email, password: $password, name: $name}) {
    user {
      email
      name
    }
    error {
      message
    }
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const AuthDocument = gql`
    mutation auth {
  auth {
    email
    name
  }
}
    `;
export type AuthMutationFn = ApolloReactCommon.MutationFunction<AuthMutation, AuthMutationVariables>;

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
export function useAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, baseOptions);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = ApolloReactCommon.MutationResult<AuthMutation>;
export type AuthMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const AddPictureDocument = gql`
    mutation addPicture($file: Upload!) {
  addProfilePicture(picture: $file)
}
    `;
export type AddPictureMutationFn = ApolloReactCommon.MutationFunction<AddPictureMutation, AddPictureMutationVariables>;

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
export function useAddPictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPictureMutation, AddPictureMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPictureMutation, AddPictureMutationVariables>(AddPictureDocument, baseOptions);
      }
export type AddPictureMutationHookResult = ReturnType<typeof useAddPictureMutation>;
export type AddPictureMutationResult = ApolloReactCommon.MutationResult<AddPictureMutation>;
export type AddPictureMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPictureMutation, AddPictureMutationVariables>;
export const GetAllEventsDocument = gql`
    query getAllEvents {
  getEvents {
    events {
      id
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
    error {
      message
    }
  }
}
    `;

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
export function useGetAllEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, baseOptions);
      }
export function useGetAllEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, baseOptions);
        }
export type GetAllEventsQueryHookResult = ReturnType<typeof useGetAllEventsQuery>;
export type GetAllEventsLazyQueryHookResult = ReturnType<typeof useGetAllEventsLazyQuery>;
export type GetAllEventsQueryResult = ApolloReactCommon.QueryResult<GetAllEventsQuery, GetAllEventsQueryVariables>;
export function refetchGetAllEventsQuery(variables?: GetAllEventsQueryVariables) {
      return { query: GetAllEventsDocument, variables: variables }
    }
export const GetEventByCoordDocument = gql`
    query getEventByCoord($input: CoordInput!) {
  getEventBaseOnPos(input: $input) {
    events {
      id
      hostInfo {
        id
        name
        email
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
    error {
      message
    }
  }
}
    `;

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
export function useGetEventByCoordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventByCoordQuery, GetEventByCoordQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEventByCoordQuery, GetEventByCoordQueryVariables>(GetEventByCoordDocument, baseOptions);
      }
export function useGetEventByCoordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventByCoordQuery, GetEventByCoordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEventByCoordQuery, GetEventByCoordQueryVariables>(GetEventByCoordDocument, baseOptions);
        }
export type GetEventByCoordQueryHookResult = ReturnType<typeof useGetEventByCoordQuery>;
export type GetEventByCoordLazyQueryHookResult = ReturnType<typeof useGetEventByCoordLazyQuery>;
export type GetEventByCoordQueryResult = ApolloReactCommon.QueryResult<GetEventByCoordQuery, GetEventByCoordQueryVariables>;
export function refetchGetEventByCoordQuery(variables?: GetEventByCoordQueryVariables) {
      return { query: GetEventByCoordDocument, variables: variables }
    }
export const GetEventByIdDocument = gql`
    query getEventById($id: String!) {
  getEventById(id: $id) {
    event {
      id
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
    error {
      path
      message
    }
  }
}
    `;

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
export function useGetEventByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, baseOptions);
      }
export function useGetEventByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, baseOptions);
        }
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>;
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>;
export type GetEventByIdQueryResult = ApolloReactCommon.QueryResult<GetEventByIdQuery, GetEventByIdQueryVariables>;
export function refetchGetEventByIdQuery(variables?: GetEventByIdQueryVariables) {
      return { query: GetEventByIdDocument, variables: variables }
    }
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    users {
      id
      email
    }
    error {
      message
      path
    }
  }
}
    `;

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
export function useGetAllUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
      }
export function useGetAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = ApolloReactCommon.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export function refetchGetAllUsersQuery(variables?: GetAllUsersQueryVariables) {
      return { query: GetAllUsersDocument, variables: variables }
    }
export const GetCurrentUserInfoDocument = gql`
    query getCurrentUserInfo {
  me {
    user {
      email
      id
      name
      avatarId
      avatar {
        data
        contentType
      }
    }
    error {
      path
      message
    }
  }
}
    `;

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
export function useGetCurrentUserInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(GetCurrentUserInfoDocument, baseOptions);
      }
export function useGetCurrentUserInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>(GetCurrentUserInfoDocument, baseOptions);
        }
export type GetCurrentUserInfoQueryHookResult = ReturnType<typeof useGetCurrentUserInfoQuery>;
export type GetCurrentUserInfoLazyQueryHookResult = ReturnType<typeof useGetCurrentUserInfoLazyQuery>;
export type GetCurrentUserInfoQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserInfoQuery, GetCurrentUserInfoQueryVariables>;
export function refetchGetCurrentUserInfoQuery(variables?: GetCurrentUserInfoQueryVariables) {
      return { query: GetCurrentUserInfoDocument, variables: variables }
    }