import { graphql, requestSubscription } from 'react-relay'

const newLinkSubscription = graphql`
  subscription MessageSubscription {
    Message {
      mutation
      node {
        id
        username
        message
        createdAt
      }
    }
  }
`

export default (environment, onNext) => {
  const subscriptionConfig = {
    subscription: newLinkSubscription,
    variables: {},
    onNext,
    updater: store => {
      const createLinkField = store.getRootField('Message')
      const mutationType = createLinkField.getValue('mutation')
      const newLink = createLinkField.getLinkedRecord('node')

      if (mutationType === 'CREATED') {
        const links = store.getRoot().getLinkedRecords('messages')
        store.getRoot().setLinkedRecords(links.concat(newLink), 'messages')
      }

      if (mutationType === 'DELETED') {
        const newLink = createLinkField.getLinkedRecord('node')
        const links = store
          .getRoot()
          .getLinkedRecords('messages')
          .filter(link => link.getDataID() !== newLink.getDataID())

        store.getRoot().setLinkedRecords(links, 'messages')
      }
    },
    onError: error => console.log(`An error occured:`, error),
  }

  requestSubscription(environment, subscriptionConfig)
}
