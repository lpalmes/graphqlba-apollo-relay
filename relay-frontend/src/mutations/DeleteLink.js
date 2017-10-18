import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation DeleteLinkMutation($id: ID!) {
    deleteLink(id: $id) {
      id
      votes
    }
  }
`

export default function commit(environment, id) {
  const variables = {
    id,
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
