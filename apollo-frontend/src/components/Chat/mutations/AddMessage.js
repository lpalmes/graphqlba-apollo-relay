import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { AllMessages } from '../queries/AllMessages'

const options = {
  name: 'addMessage',
  options: props => ({
    update: (store, { data: { createMessage } }) => {
      const data = store.readQuery({ query: AllMessages })

      const messageExists = data.messages.find(m => m.id === createMessage.id)
      if (!messageExists) {
        data.messages.push(createMessage)
      }

      store.writeQuery({ query: AllMessages, data })
    }
  })
}

const AddMessage = gql`
  mutation addMessage($message: String!) {
    createMessage(username: "user", message: $message) {
      id
      message
      username
      createdAt
    }
  }
`

export default graphql(AddMessage, options)
