import gql from 'graphql-tag'

export const mutationLogin = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        email
      }
      errors {
        message
      }
    }
  }
`
export const mutationSignUp = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    register(input: { email: $email, password: $password, name: $name }) {
      user {
        email
      }
      errors {
        message
      }
    }
  }
`

export const mutationLogout = gql`
  mutation {
    logout
  }
`

export const mutationAuth = gql`
  mutation muauth {
    auth {
      email
      name
    }
  }
`
