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
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  hostId: Scalars['String'];
  membersInfo: Array<MemberInfo>;
  time: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
  place: Place;
  information: Information;
};

export type EventCreateInput = {
  hostId: Scalars['String'];
  membersInfo: Array<EventMemberInfoInput>;
  time: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
  place: EventPlaceInput;
  information: EventInformationInput;
};

export type EventInformationInput = {
  eventName: Scalars['String'];
  description: Scalars['String'];
};

export type EventMemberInfoInput = {
  id: Scalars['String'];
  /** secret or public */
  type: Scalars['Float'];
};

export type EventPlaceInput = {
  name: Scalars['String'];
  coord: CoordInput;
};

export type EventResponse = {
  __typename?: 'EventResponse';
  event?: Maybe<Event>;
  errors?: Maybe<Array<FieldError>>;
};

export type EventsResponse = {
  __typename?: 'EventsResponse';
  events?: Maybe<Array<Event>>;
  errors?: Maybe<Array<FieldError>>;
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
  errors?: Maybe<Array<FieldError>>;
};

export type EventTagsResponse = {
  __typename?: 'EventTagsResponse';
  eventTags?: Maybe<Array<EventTag>>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
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
  type: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  auth?: Maybe<User>;
  logout: Scalars['Boolean'];
  createEvent: EventResponse;
  createTag: EventTagResponse;
  changeTagQuantity: EventTagResponse;
  IncreaseOrDecreaseTagQuantity: EventTagResponse;
};


export type MutationRegisterArgs = {
  input: SignUpInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
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

export type Place = {
  __typename?: 'Place';
  name: Scalars['String'];
  coord: Coord;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: UsersResponse;
  me?: Maybe<User>;
  book: Scalars['String'];
  getBooks: BooksResponse;
  getEvents: EventsResponse;
  getEventBaseOnPos: EventsResponse;
  getAllTag: EventTagsResponse;
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
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  users?: Maybe<Array<User>>;
  errors?: Maybe<Array<FieldError>>;
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
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
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
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
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

export type GetAllUsersQueryVariables = {};


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: (
    { __typename?: 'UsersResponse' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>> }
  ) }
);

export type GetCurrentUserInfoQueryVariables = {};


export type GetCurrentUserInfoQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type QueryGetEventByCoordQueryVariables = {
  input: CoordInput;
};


export type QueryGetEventByCoordQuery = (
  { __typename?: 'Query' }
  & { getEventBaseOnPos: (
    { __typename?: 'EventsResponse' }
    & { events?: Maybe<Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'hostId' | 'time'>
      & { membersInfo: Array<(
        { __typename?: 'MemberInfo' }
        & Pick<MemberInfo, 'id' | 'type'>
      )>, information: (
        { __typename?: 'Information' }
        & Pick<Information, 'eventName' | 'description'>
      ), place: (
        { __typename?: 'Place' }
        & Pick<Place, 'name'>
        & { coord: (
          { __typename?: 'Coord' }
          & Pick<Coord, 'latitude' | 'longitude'>
        ) }
      ) }
    )>>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    user {
      email
    }
    errors {
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
    errors {
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
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    users {
      email
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
    email
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
export const QueryGetEventByCoordDocument = gql`
    query queryGetEventByCoord($input: CoordInput!) {
  getEventBaseOnPos(input: $input) {
    events {
      hostId
      membersInfo {
        id
        type
      }
      time
      information {
        eventName
        description
      }
      place {
        name
        coord {
          latitude
          longitude
        }
      }
    }
    errors {
      message
    }
  }
}
    `;

/**
 * __useQueryGetEventByCoordQuery__
 *
 * To run a query within a React component, call `useQueryGetEventByCoordQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryGetEventByCoordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryGetEventByCoordQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQueryGetEventByCoordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>) {
        return ApolloReactHooks.useQuery<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>(QueryGetEventByCoordDocument, baseOptions);
      }
export function useQueryGetEventByCoordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>(QueryGetEventByCoordDocument, baseOptions);
        }
export type QueryGetEventByCoordQueryHookResult = ReturnType<typeof useQueryGetEventByCoordQuery>;
export type QueryGetEventByCoordLazyQueryHookResult = ReturnType<typeof useQueryGetEventByCoordLazyQuery>;
export type QueryGetEventByCoordQueryResult = ApolloReactCommon.QueryResult<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>;
export function refetchQueryGetEventByCoordQuery(variables?: QueryGetEventByCoordQueryVariables) {
      return { query: QueryGetEventByCoordDocument, variables: variables }
    }