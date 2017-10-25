import React from 'react'
import { compose } from 'react-apollo'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

class Link extends React.Component {
  voteLink = () => {
    const { link, voteLink } = this.props

    voteLink({
      variables: { linkId: link.id }
    })
  }

  deleteLink = () => {
    const { link, deleteLink } = this.props

    deleteLink({
      variables: { linkId: link.id }
    })
  }

  render() {
    const { link } = this.props

    return (
      <article className="Link">
        <h2>{link.url}</h2>
        <p>{link.description}</p>
        <p className="votes">
          {link.votes}
          <span role="img" aria-label="upvote" className="action-button" onClick={this.voteLink}>❤️</span>
          <span role="img" aria-label="delete" className="action-button" onClick={this.deleteLink}>🗑</span>
        </p>
      </article>
    )
  }
}

export default compose(
  VoteLink,
  DeleteLink
)(Link)
