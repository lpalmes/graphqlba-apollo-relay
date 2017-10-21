const { Model } = require('objection')
const path = require('path')

class Link extends Model {
  static get tableName () {
    return 'links'
  }

  static get relationMappings () {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Message'),
        join: {
          from: 'messages.link_id',
          to: 'links.id'
        }
      }
    }
  }
}

module.exports = Link
