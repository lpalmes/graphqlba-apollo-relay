// @flow

import React, { Component } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import './App.css'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

import News from './News'
import Chat from './Chat'

import type { AppQueryResponse } from './__generated__/AppQuery.graphql'
import type { Environment } from 'react-relay'

type Props = {
  environment: Environment
}

type State = {
  tab: number
}

class App extends Component<Props, State> {
  state = {
    tab: 0
  }

  render() {
    const { tab } = this.state
    const { environment } = this.props
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            allLinks {
              id
              url
              description
              votes
            }
            messages {
              id
              username
              message
              createdAt
            }
          }
        `}
        render={relayProps => {
          const { error } = relayProps
          const props: ?AppQueryResponse = relayProps.props

          if (error) {
            return <div>{error.message}</div>
          }

          if (props !== null && props !== undefined) {
            return (
              <div>
                <AppBar position="fixed" color="default">
                  <Tabs
                    value={tab}
                    onChange={(e, tab) => this.setState({ tab })}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                  >
                    <Tab label="Noticias" />
                    <Tab label="Chat" />
                  </Tabs>
                </AppBar>
                <div style={{ paddingTop: 48 }}>
                  {tab === 0 && (
                    <News environment={environment} links={props.allLinks} />
                  )}
                  {tab === 1 && (
                    <Chat environment={environment} messages={props.messages} />
                  )}
                </div>
              </div>
            )
          }

          return <div>Loading</div>
        }}
      />
    )
  }
}

export default App
