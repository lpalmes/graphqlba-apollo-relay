import React from 'react'
import ReactDOM from 'react-dom'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import './index.css'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import App from './App'

const source = new RecordSource()
const store = new Store(source)

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('http://192.168.1.103:4000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
    guard: 'request-no-cors',
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(
    'ws://192.168.1.103:4000/subscriptions',
    { reconnect: true },
  )
  subscriptionClient.subscribe({ query, variables }, (error, result) => {
    observer.onNext({ data: result })
  })
}

const network = Network.create(fetchQuery, setupSubscription)

const environment = new Environment({
  network,
  store,
})

ReactDOM.render(
  <App environment={environment} />,
  document.getElementById('root'),
)
