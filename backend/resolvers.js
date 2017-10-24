const Link = require('./models/Link.js')
const Message = require('./models/Message.js')
const uuid = require('uuid/v4')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = {
  Query: {
    allLinks: async (root, { filter, first, skip }) => {
      try {
        const links = await Link.query()
        return links
      } catch (e) {
        console.error(e)
      }
    },
    messages: async (root, { first }) => {
      try {
        const messages = await Message.query()
        return messages
      } catch (e) {
        console.error(e)
      }
    }
  },

  Mutation: {
    createLink: async (root, data) => {
      try {
        const id = uuid()
        let newLink = Object.assign({ id, votes: 0 }, data)
        pubsub.publish('Link', { Link: { mutation: 'CREATED', node: newLink } })
        newLink = await Link.query().insert(newLink)
        return newLink
      } catch (e) {
        console.error(e)
      }
    },
    voteLink: async (root, data) => {
      try {
        const { id } = data
        let link = await Link.query().where('id', id)
        link = link[0]
        link = await Link.query().updateAndFetchById(id, {
          votes: link.votes + 1
        })
        pubsub.publish('Link', {
          Link: { mutation: 'UPDATED', node: link }
        })
        return link
      } catch (e) {
        console.error(e)
      }
    },
    deleteLink: async (root, data) => {
      try {
        const { id } = data
        const links = await Link.query().where('id', id)
        const link = links[0]
        pubsub.publish('Link', {
          Link: { mutation: 'DELETED', node: link }
        })
        await Link.query()
          .delete()
          .where('id', id)

        return link
      } catch (e) {
        console.error(e)
      }
    },
    createMessage: async (root, data) => {
      try {
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
      } catch (e) {
        console.error(e)
      }
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
