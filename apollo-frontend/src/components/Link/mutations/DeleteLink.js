import gql from 'graphql-tag'
import { AllLinksQuery } from '../../Links'
import { graphql } from 'react-apollo'

const options = {
  name: 'deleteLink',
  options: {
    update: (store, { data: { deleteLink } }) => {
      const data = store.readQuery({ query: AllLinksQuery })

      store.writeQuery({
        query: AllLinksQuery,
        data: {
          ...data,
          allLinks: data.allLinks.filter(link => link.id !== deleteLink.id)
        }
      })
    }
  }
}

const DeleteLink = gql`
  mutation deleteLink($linkId: ID!) {
    deleteLink(id: $linkId) {
      id
    }
  }
`

export default graphql(DeleteLink, options)
