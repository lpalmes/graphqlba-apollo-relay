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
import { Constants } from 'expo'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { QueryRenderer, graphql } from 'react-relay'

import LinkSubscription from './subscriptions/LinkSubscription'
import MessageSubscription from './subscriptions/MessageSubscription'
import CreateMessage from './mutations/CreateMessage'
import CreateLink from './mutations/CreateLink'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

import type { Environment } from 'react-relay'
import type { AppLinksQueryResponse } from './__generated__/AppLinksQuery.graphql'
import type { AppMessagesQueryResponse } from './__generated__/AppMessagesQuery.graphql'

type Props = {
  environment: Environment
}

type State = {
  hasUsername: boolean,
  username: string,
  message: string
}

class Chat extends Component<Props, State> {
  state = {
    hasUsername: false,
    username: '',
    message: ''
  }

  componentDidMount() {
    MessageSubscription(this.props.environment, () => {})
  }

  render() {
    const { hasUsername, username, message } = this.state
    const { environment } = this.props

    if (hasUsername === false) {
      return (
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <View>
              <Text> Seleccione su nombre de usuario</Text>
            </View>
            <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              placeholder="Nombre de usuario"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.setState({ hasUsername: true })}
              returnKeyType="send"
              blurOnSubmit={true}
            />
            <View>
              <Button
                title="Sign Up"
                onPress={() => this.setState({ hasUsername: true })}
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
          query ChatMessagesQuery {
            messages {
              id
              message
              username
              createdAt
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
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                  <ScrollView
                    ref={ref => (this.scrollView = ref)}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      this.scrollView.scrollToEnd({ animated: true })
                    }}
                  >
                    <View style={{ margin: 20 }}>
                      <Text style={{ fontSize: 50 }}>Chat</Text>
                      <Text style={{ fontSize: 15 }}>Usuario: {username}</Text>
                      {props.messages.map(message => (
                        <View
                          key={message.id}
                          style={{
                            marginTop: 30,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Text style={{ fontSize: 20 }}>
                            {message.message}
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            {message.username}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                  <View style={{ marginBottom: 50 }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
    backgroundColor: '#336699'
  },
  description: {
    fontSize: 14,
    color: 'white'
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16
  },
  legal: {
    margin: 10,
    color: '#333',
    fontSize: 12,
    textAlign: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'space-around'
  }
})

export default Chat
