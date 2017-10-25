import React from 'react'
import AddMessage from './mutations/AddMessage'
import AllMessages from './queries/AllMessages'
import { compose } from 'react-apollo'

class Chat extends React.Component {
  state = { message: '' }

  componentWillMount() {
    this.props.subscribeToMessages()
  }

  addMessage = () => {
    this.props.addMessage({
      variables: { message: this.state.message }
    })
    this.setState({ message: '' })
  }

  render() {
    const { loading, messages } = this.props.data;

    if (loading) return 'Cargando';

    return (
      <section className="Chat">
        <section className="messages">
          {messages.map(m => <p key={m.id}>{m.message}</p>)}
        </section>
        <section className="newMessage">
          <input
            type="text"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button onClick={this.addMessage}>Enviar</button>
        </section>
      </section>
    )
  }
}

export default compose(
  AllMessages,
  AddMessage
)(Chat)
