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
const resolvers = require('./resolvers')

const { PubSub } = require('graphql-subscriptions')
const uuid = require('uuid/v4')

const cors = require('cors')

const pubsub = new PubSub()

const schemaFile = fs.readFileSync('./schema.graphql', {
  encoding: 'utf8',
})

let links = {}

let messages = []

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
