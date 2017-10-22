const { Model } = require('objection')
const path = require('path')

class Message extends Model {
  static get tableName() {
    return 'messages'
  }

  static get relationMappings() {
    return {
      link: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Link'),
        join: { from: 'messages.link_id', to: 'links.id' },
      },
    }
  }
}

module.exports = Message
