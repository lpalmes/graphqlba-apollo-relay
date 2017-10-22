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
      const newLink = createLinkField.getLinkedRecord('node')

      const links = store.getRoot().getLinkedRecords('messages')
      store.getRoot().setLinkedRecords(links.concat(newLink), 'messages')
    },
    onError: error => console.log(`An error occured:`, error),
  }

  requestSubscription(environment, subscriptionConfig)
}
