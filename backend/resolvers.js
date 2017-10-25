const Link = require('./models/Link.js')
const Message = require('./models/Message.js')
const uuid = require('uuid/v4')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = {
  Query: {
    allLinks: async (root, { filter, first, skip }) => {
      const links = await Link.query()
      return links
    },
    messages: async (root, { first }) => {
      const messages = await Message.query()
      return messages
    }
  },

  Mutation: {
    createLink: async (root, data) => {
      const id = uuid()
      let newLink = Object.assign({ id, votes: 0 }, data)
      pubsub.publish('Link', { Link: { mutation: 'CREATED', node: newLink } })
      newLink = await Link.query().insert(newLink)

      return newLink
    },
    voteLink: async (root, data) => {
      const { id } = data
      let link = await Link.query().where('id', id).first()
      link = await Link.query().updateAndFetchById(id, {
        votes: link.votes + 1
      })
      pubsub.publish('Link', {
        Link: { mutation: 'UPDATED', node: link }
      })

      return link
    },
    deleteLink: async (root, data) => {
      const { id } = data
      const link = await Link.query().where('id', id).first()
      pubsub.publish('Link', {
        Link: { mutation: 'DELETED', node: link }
      })
      await Link.query()
        .delete()
        .where('id', id)

      return link
    },
    createMessage: async (root, data) => {
      const id = uuid()

      if (data.message === 'clear') {
        const messages = await Message.query()
        messages.forEach(message => {
          pubsub.publish('Message', {
            Message: { mutation: 'DELETED', node: message }
          })
        })

        await Message.query().delete()
      }
      let newMessage = Object.assign({ id, createdAt: new Date() }, data)
      pubsub.publish('Message', {
        Message: { mutation: 'CREATED', node: newMessage }
      })
      newMessage = await Message.query().insert(newMessage)

      return newMessage
    }
  },

  Subscription: {
    Link: {
      subscribe: () => pubsub.asyncIterator('Link')
    },
    Message: {
      subscribe: () => pubsub.asyncIterator('Message')
    }
  }
}
