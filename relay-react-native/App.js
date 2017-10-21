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
  TextInput,
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

const source = new RecordSource()
const store = new Store(source)

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('http://192.168.0.5:4000/graphql', {
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
    'ws://192.168.0.5:4000/subscriptions',
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

class Links extends Component {
  componentDidMount() {
    LinkSubscription(environment)
    MessageSubscription(environment, () => {})
  }

  voteLink = (id: string) => VoteLink(environment, id)

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppLinksQuery {
            allLinks {
              id
              url
              description
              votes
            }
          }
        `}
        render={relayProps => {
          const { error, retry } = relayProps
          const props: ?AppLinksQueryResponse = relayProps.props

          if (error) {
            return (
              <View style={styles.container}>
                <Text>Hubo un error</Text>
                <Button title="Reintentar" onPress={retry} />
              </View>
            )
          }

          if (props) {
            return (
              <ScrollView contentStyle={styles.container}>
                <View style={{ margin: 20 }}>
                  <Text style={{ fontSize: 50 }}>Links</Text>
                  {props.allLinks.map(link => (
                    <View key={link.id} style={{ marginTop: 30 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>{link.description}</Text>
                        <Text style={{ fontSize: 15 }}>{link.votes}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>{link.url}</Text>
                        <Button
                          title="Votar"
                          onPress={() => this.voteLink(link.id)}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )
          }

          return (
            <View style={styles.container}>
              <Text>Cargando...</Text>
            </View>
          )
        }}
      />
    )
  }
}

class Chat extends Component {
  state = {
    hasUsername: false,
    username: '',
    message: '',
  }

  componentDidMount() {
    MessageSubscription(environment, () => {})
  }

  render() {
    const { hasUsername, username, message } = this.state

    if (hasUsername === false) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#ecf0f1',
          }}
        >
          <View>
            <Button
              title="Agregar nombre de usuario"
              onPress={() => this.setState({ hasUsername: true })}
            />
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="nombre de usuario"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="send"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      )
    }
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppMessagesQuery {
            messages {
              id
              message
              username
              created
            }
          }
        `}
        render={relayProps => {
          const { error, retry } = relayProps
          const props: ?AppMessagesQueryResponse = relayProps.props

          if (error) {
            return (
              <View style={styles.container}>
                <Text>Hubo un error</Text>
                <Button title="Reintentar" onPress={retry} />
              </View>
            )
          }

          if (props) {
            return (
              <View style={{ flex: 1 }}>
                <ScrollView contentStyle={styles.container}>
                  <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 50 }}>Chat</Text>
                    {props.messages.map(message => (
                      <View key={message.id} style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 20 }}>{message.message}</Text>
                        <Text style={{ fontSize: 15 }}>{message.username}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
                <KeyboardAvoidingView behavior="padding">
                  <View>
                    <TextInput
                      value={message}
                      onChangeText={message => this.setState({ message })}
                      placeholder="nombre de usuario"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="send"
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            )
          }

          return (
            <View style={styles.container}>
              <Text>Cargando...</Text>
            </View>
          )
        }}
      />
    )
  }
}

export default class App extends Component {
  state = {
    tab: 'links',
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
        {this.state.tab === 'links' && <Links />}
        {this.state.tab === 'chat' && <Chat />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
