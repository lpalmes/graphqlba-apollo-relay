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
import CreateLink from './mutations/CreateLink'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

import type { AppLinksQueryResponse } from './__generated__/AppLinksQuery.graphql'
import type { AppMessagesQueryResponse } from './__generated__/AppMessagesQuery.graphql'

class News extends Component {
  componentDidMount() {
    LinkSubscription(this.props.environment)
  }

  voteLink = (id: string) => VoteLink(this.props.environment, id)

  render() {
    const { environment } = this.props
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query NewsLinksQuery {
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
                          justifyContent: 'space-between'
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>{link.description}</Text>
                        <Text style={{ fontSize: 15 }}>{link.votes}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default News
