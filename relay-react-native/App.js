// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput
} from 'react-native'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { QueryRenderer, graphql } from 'react-relay'

import LinkSubscription from './subscriptions/LinkSubscription'
import MessageSubscription from './subscriptions/MessageSubscription'
import CreateMessage from './mutations/CreateMessage'
import CreateLink from './mutations/CreateLink'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

import Chat from './Chat'
import News from './News'

import type { AppLinksQueryResponse } from './__generated__/AppLinksQuery.graphql'
import type { AppMessagesQueryResponse } from './__generated__/AppMessagesQuery.graphql'

const source = new RecordSource()
const store = new Store(source)

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('http://172.20.10.02:4000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    guard: 'request-no-cors',
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json()
  })
}

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(
    'ws://172.20.10.02:4000/subscriptions',
    { reconnect: true }
  )
  subscriptionClient.subscribe({ query, variables }, (error, result) => {
    observer.onNext({ data: result })
  })
}

const network = Network.create(fetchQuery, setupSubscription)

const environment = new Environment({
  network,
  store
})

export default class App extends Component {
  state = {
    tab: 'links'
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            title="Links"
            onPress={() => this.setState({ tab: 'links' })}
          />
          <Button title="Chat" onPress={() => this.setState({ tab: 'chat' })} />
        </View>
        {this.state.tab === 'links' && <News environment={environment} />}
        {this.state.tab === 'chat' && <Chat environment={environment} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
