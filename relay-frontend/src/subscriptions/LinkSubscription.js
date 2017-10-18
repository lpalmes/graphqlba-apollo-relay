import { graphql, requestSubscription } from 'react-relay'

const newLinkSubscription = graphql`
  subscription LinkSubscription {
    Link {
      mutation
      node {
        id
        url
        description
        votes
      }
    }
  }
`

export default environment => {
  const subscriptionConfig = {
    subscription: newLinkSubscription,
    variables: {},
    updater: store => {
      const createLinkField = store.getRootField('Link')

      const mutationType = createLinkField.getValue('mutation')
      const newLink = createLinkField.getLinkedRecord('node')

      if (mutationType === 'CREATED') {
        const links = store.getRoot().getLinkedRecords('allLinks')
        store.getRoot().setLinkedRecords(links.concat(newLink), 'allLinks')
      }

      if (mutationType === 'UPDATED') {
        const newLink = createLinkField.getLinkedRecord('node')
        const links = store
          .getRoot()
          .getLinkedRecords('allLinks')
          .map(link => {
            if (link.getDataID() === newLink.getDataID()) {
              link.setValue(newLink.getValue('votes'), 'votes')
            }
            return link
          })

        store.getRoot().setLinkedRecords(links, 'allLinks')
      }

      if (mutationType === 'DELETED') {
        const newLink = createLinkField.getLinkedRecord('node')
        const links = store
          .getRoot()
          .getLinkedRecords('allLinks')
          .filter(link => link.getDataID() !== newLink.getDataID())

        store.getRoot().setLinkedRecords(links, 'allLinks')
      }
    },
    onError: error => console.log(`An error occured:`, error),
  }

  requestSubscription(environment, subscriptionConfig)
}
