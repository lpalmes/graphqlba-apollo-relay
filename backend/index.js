const express = require('express')

const bodyParser = require('body-parser')
const fs = require('fs')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { formatError } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { URL } = require('url')

const { PubSub } = require('graphql-subscriptions')
const uuid = require('uuid/v4')

const cors = require('cors')

const pubsub = new PubSub()

const schemaFile = fs.readFileSync('./schema.graphql', {
  encoding: 'utf8',
})

let links = {}

let messages = []

const resolvers = {
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

const schema = makeExecutableSchema({ typeDefs: schemaFile, resolvers })

const start = async () => {
  try {
    const app = express()

    const buildOptions = async (req, res) => {
      return {
        schema,
      }
    }
    app.use(cors())

    app.options('*', cors())
    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions))

    const PORT = 4000
    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
      }),
    )

    const server = createServer(app)
    server.listen(PORT, () => {
      SubscriptionServer.create(
        { execute, subscribe, schema },
        { server, path: '/subscriptions' },
      )
      console.log(`Hackernews GraphQL server running on port ${PORT}.`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()
