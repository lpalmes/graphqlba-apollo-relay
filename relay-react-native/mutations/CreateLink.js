import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation CreateLinkMutation($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
    }
  }
`

export default function commit(environment, url, description) {
  const variables = {
    url,
    description,
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
