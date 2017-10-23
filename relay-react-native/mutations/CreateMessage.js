import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation CreateMessageMutation($username: String!, $message: String!) {
    createMessage(username: $username, message: $message) {
      id
      message
      username
      createdAt
    }
  }
`

export default function commit(environment, username, message) {
  const variables = {
    username,
    message,
  }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log('Response received from server.')
    },
    onError: err => console.error(err),
  })
}
