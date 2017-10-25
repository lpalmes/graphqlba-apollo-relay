import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const AllMessages = gql`
  query AllMessages {
    messages {
      id
      message
      username
      createdAt
    }
  }
`

const SubscribeToMessages = gql`
  subscription SubscribeToMessages {
    Message {
      mutation
      node {
        id
        message
        username
        createdAt
      }
    }
  }
`

const options = {
  props: props => ({
    ...props,
    subscribeToMessages: () => {
      return props.data.subscribeToMore({
        document: SubscribeToMessages,
        updateQuery: (prev, { subscriptionData: { Message } }) => {
          if (!Message) {
            return prev;
          }

          const messageExists = prev.messages.find(m => m.id === Message.node.id);

          if (!messageExists) {
            return {
              messages: [...prev.messages, Message.node]
            }
          }
        }
      })
    }
  })
}

export default graphql(AllMessages, options)
