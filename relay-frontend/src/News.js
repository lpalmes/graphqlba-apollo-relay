// @flow
import React, { Component } from 'react'
import { Typography, IconButton, Button, TextField } from 'material-ui'

import { Favorite, DeleteForever } from 'material-ui-icons'

import LinkSubscription from './subscriptions/LinkSubscription'
import CreateLink from './mutations/CreateLink'
import VoteLink from './mutations/VoteLink'
import DeleteLink from './mutations/DeleteLink'

import type { AppQueryResponse } from './__generated__/AppQuery.graphql'
import type { Environment } from 'react-relay'

type Props = {
  environment: Environment,
  links: Array<any>
}

type State = {
  url: string,
  description: string
}

class News extends Component<Props, State> {
  state = {
    url: '',
    description: ''
  }

  createLink = () => {
    CreateLink(this.props.environment, this.state.url, this.state.description)
    this.setState({ url: '', description: '' })
  }

  componentDidMount() {
    LinkSubscription(this.props.environment)
  }

  voteLink = (id: string) => {
    VoteLink(this.props.environment, id)
  }

  deleteLink = (id: string) => {
    DeleteLink(this.props.environment, id)
  }

  render() {
    const { links } = this.props
    return (
      <div style={{ margin: 20 }}>
        <div>
          {links.map(link => (
            <div
              key={link.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5
              }}
            >
              <div>
                <a href={link.url} style={{ textDecoration: 'none' }}>
                  <Typography>
                    {link.description} ({link.url})
                  </Typography>
                </a>
                <Typography type="caption">{link.votes} puntos</Typography>
              </div>
              <div>
                <IconButton onClick={() => this.voteLink(link.id)}>
                  <Favorite />
                </IconButton>
                <IconButton onClick={() => this.deleteLink(link.id)}>
                  <DeleteForever />
                </IconButton>
              </div>
            </div>
          ))}
        </div>

        <Typography>Agregar link</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={this.state.description}
            placeholder="Descripcion"
            onChange={e => this.setState({ description: e.target.value })}
          />
          <div style={{ marginLeft: 10 }} />
          <TextField
            value={this.state.url}
            placeholder="Link"
            onChange={e => this.setState({ url: e.target.value })}
          />
          <div style={{ marginLeft: 10 }} />
          <Button onClick={this.createLink}>Crear</Button>
        </div>
      </div>
    )
  }
}

export default News
