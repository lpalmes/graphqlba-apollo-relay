import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const options = {
  name: 'voteLink',
  options: props => ({
    optimisticResponse: {
      voteLink: {
        __typename: props.link.__typename,
        id: props.link.id,
        votes: props.link.votes + 1
      }
    }
  })
}

const VoteLink = gql`
  mutation voteLink($linkId: ID!) {
    voteLink(id: $linkId) {
      id
      votes
    }
  }
`

export default graphql(VoteLink, options)
