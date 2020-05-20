import gql from 'graphql-tag'
export const queryGetEventByCoord = gql`
  query getEventByCoord($input: CoordInput!) {
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
`
