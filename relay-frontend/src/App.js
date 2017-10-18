import React, { Component } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import './App.css'

import LinkSubscription from './subscriptions/LinkSubscription'
import MessageSubscription from './subscriptions/MessageSubscription'
import CreateMessage from './mutations/CreateMessage'
import CreateLink from './mutations/CreateLink'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

type Props = {
  environment: any,
}

class App extends Component<Props> {
  state = {
    hasUsername: localStorage.getItem('username') ? true : false,
    username: localStorage.getItem('username') || '',
    message: '',
    url: '',
    description: '',
  }
  componentDidMount() {
    LinkSubscription(this.props.environment)
    MessageSubscription(this.props.environment, () => {
      this.chat.scrollTop = 10000000000000000000000000000
    })
  }

  sendMessage = () => {
    CreateMessage(
      this.props.environment,
      this.state.username,
      this.state.message,
    )
    this.setState({ message: '' })
  }

  createLink = () => {
    CreateLink(this.props.environment, this.state.url, this.state.description)
    this.setState({ url: '', description: '' })
  }

  voteLink = id => {
    VoteLink(this.props.environment, id)
  }

  deleteLink = id => {
    DeleteLink(this.props.environment, id)
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
              created
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 50,
                  }}
                >
                  <h1>Noticias</h1>
                  <div
                    style={{
                      overflowY: 'auto',
                      width: '100%',
                    }}
                  >
                    {props.allLinks.map(link => (
                      <div
                        key={link.id}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 5,
                        }}
                      >
                        <div>
                          <a href={link.url}>
                            <span>
                              {link.description} ({link.url})
                            </span>
                          </a>
                        </div>
                        <div>
                          <span>{link.votes}</span>
                          <button onClick={() => this.voteLink(link.id)}>
                            Votar
                          </button>
                          <button onClick={() => this.deleteLink(link.id)}>
                            Borrar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 20,
                    }}
                  >
                    <input
                      value={this.state.description}
                      placeholder="Descripcion"
                      onChange={e =>
                        this.setState({ description: e.target.value })}
                    />
                    <input
                      value={this.state.url}
                      placeholder="url"
                      onChange={e => this.setState({ url: e.target.value })}
                    />
                    <button onClick={this.createLink}>Crear</button>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 50,
                  }}
                >
                  {this.state.hasUsername === false ? (
                    <div>
                      <span>Ingrese un nombre de usuario</span>
                      <input
                        value={this.state.username}
                        onKeyDown={e => {
                          if (e.keyCode === 13) this.login()
                        }}
                        onChange={e =>
                          this.setState({ username: e.target.value })}
                      />
                      <button onClick={this.login}>Confirmar</button>
                    </div>
                  ) : (
                    <div>
                      <h1>Chat</h1>
                      <h2>{this.state.username}</h2>
                      <button onClick={this.logout}>Logout</button>
                      <div
                        id="chat"
                        style={{ overflowY: 'auto', flex: 1, height: 400 }}
                        ref={ref => (this.chat = ref)}
                      >
                        {props.messages.map(message => (
                          <div key={message.id} style={{ padding: 5 }}>
                            <span>
                              {message.username} {message.message}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex' }}>
                        <input
                          value={this.state.message}
                          placeholder="mensaje"
                          style={{ flex: 1 }}
                          onKeyDown={e => {
                            if (e.keyCode === 13) this.sendMessage()
                          }}
                          onChange={e =>
                            this.setState({ message: e.target.value })}
                        />
                        <button onClick={this.sendMessage}>Enviar</button>
                      </div>
                    </div>
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
