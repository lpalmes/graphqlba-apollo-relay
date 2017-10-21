exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary().unsigned()
    table.string('message')
    table.string('username')
    table.string('createdAt')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
