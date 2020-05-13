import gql from 'graphql-tag'

export const queryAuth = gql`
  query {
    me {
      email
      name
    }
  }
`
