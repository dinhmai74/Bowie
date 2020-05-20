import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
export type QueryGetEventByCoordComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>, 'query'> & ({ variables: QueryGetEventByCoordQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const QueryGetEventByCoordComponent = (props: QueryGetEventByCoordComponentProps) => (
      <ApolloReactComponents.Query<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables> query={QueryGetEventByCoordDocument} {...props} />
    );
    
export type QueryGetEventByCoordProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables>
    } & TChildProps;
export function withQueryGetEventByCoord<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  QueryGetEventByCoordQuery,
  QueryGetEventByCoordQueryVariables,
  QueryGetEventByCoordProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, QueryGetEventByCoordQuery, QueryGetEventByCoordQueryVariables, QueryGetEventByCoordProps<TChildProps, TDataName>>(QueryGetEventByCoordDocument, {
      alias: 'queryGetEventByCoord',
      ...operationOptions
    });
};

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