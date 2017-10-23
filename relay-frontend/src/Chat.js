// @flow
import React, { Component } from 'react'
import type { Environment } from 'react-relay'
import { format } from 'date-fns'

import { Typography, IconButton, Paper, TextField, Button } from 'material-ui'
import MessageSubscription from './subscriptions/MessageSubscription'
import CreateMessage from './mutations/CreateMessage'

type Props = {
  environment: Environment,
  messages: Array<any>
}

type State = {
  hasUsername: boolean,
  username: string,
  message: string
}

class Chat extends Component<Props, State> {
  state = {
    hasUsername: localStorage.getItem('username') ? true : false,
    username: localStorage.getItem('username') || '',
    message: ''
  }

  componentDidMount() {
    MessageSubscription(this.props.environment, () => {
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

  sendMessage = () => {
    if (this.state.message === '') return
    CreateMessage(
      this.props.environment,
      this.state.username,
      this.state.message
    )
    window.scrollTo(0, document.body.scrollHeight)
    this.setState({ message: '' })
  }

  login = () => {
    this.setState({ hasUsername: true })
    window.localStorage.setItem('username', this.state.username)
  }

  logout = () => {
    localStorage.clear()
    this.setState({ username: '', hasUsername: false })
  }

  render() {
    const { messages } = this.props
    const { hasUsername } = this.state

    if (hasUsername === false) {
      return (
        <div>
          <span>Ingrese un nombre de usuario</span>
          <input
            value={this.state.username}
            onKeyDown={e => {
              if (e.keyCode === 13) this.login()
            }}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button onClick={this.login}>Confirmar</button>
        </div>
      )
    }

    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 60
        }}
      >
        <div>
          <h2>{this.state.username}</h2>
          <button onClick={this.logout}>Logout</button>
          <div>
            {messages.map(message => (
              <div key={message.id} style={{ padding: 5 }}>
                <Typography type="subheading" component="span">
                  {message.username}
                </Typography>
                <Typography component="span">{message.message}</Typography>
              </div>
            ))}
          </div>
        </div>
        <Paper
          style={{
            display: 'flex',
            position: 'fixed',
            justifyContent: 'space-between',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 60,
            alignItems: 'center'
          }}
        >
          <TextField
            value={this.state.message}
            fullWidth
            style={{ marginLeft: 15 }}
            placeholder="mensaje"
            onKeyDown={e => {
              if (e.keyCode === 13) this.sendMessage()
            }}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <Button
            onClick={this.sendMessage}
            disabled={this.state.message === ''}
          >
            Enviar
          </Button>
        </Paper>
      </div>
    )
  }
}

export default Chat
