import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Link extends React.Component {
  onVoteLink = () => {
    const { link, mutate } = this.props

    mutate({
      variables: { linkId: link.id },
      optimisticResponse: {
        voteLink: {
          __typename: link.__typename,
          id: link.id,
          votes: link.votes + 1
        }
      }
    })
  }

  render() {
    const { link } = this.props

    return (
      <article className="Link">
        <h2>{link.url}</h2>
        <p>{link.description}</p>
        <p>{link.votes} <span role="img" aria-label="upvote" onClick={this.onVoteLink}>❤️</span></p>
      </article>
    )
  }
}

const voteLink = gql`
  mutation voteLink($linkId: ID!) {
    voteLink(id: $linkId) {
      id
      votes
    }
  }
`

export default graphql(voteLink)(Link)
