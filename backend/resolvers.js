module.exports = {
  Query: {
    allLinks: (root, { filter, first, skip }) => {
      return Object.values(links)
    },
    messages: (root, { first }) => messages,
  },

  Mutation: {
    createLink: (root, data) => {
      const id = uuid()
      const newLink = Object.assign({ id, votes: 0 }, data)
      pubsub.publish('Link', { Link: { mutation: 'CREATED', node: newLink } })
      links[id] = newLink
      return newLink
    },
    createMessage: (root, data) => {
      const id = uuid()
      const newMessage = Object.assign({ id, created: new Date() }, data)
      pubsub.publish('Message', {
        Message: { mutation: 'CREATED', node: newMessage },
      })
      messages = [...messages, newMessage]
      return newMessage
    },
    voteLink: (root, data) => {
      const { id } = data
      links[id].votes = links[id].votes + 1
      pubsub.publish('Link', {
        Link: { mutation: 'UPDATED', node: links[id] },
      })
      return links[id]
    },
    deleteLink: (root, data) => {
      const { id } = data
      const link = links[id]
      delete links[id]
      pubsub.publish('Link', {
        Link: { mutation: 'DELETED', node: link },
      })
      return link
    },
  },

  Subscription: {
    Link: {
      subscribe: () => pubsub.asyncIterator('Link'),
    },
    Message: {
      subscribe: () => pubsub.asyncIterator('Message'),
    },
  },
}
