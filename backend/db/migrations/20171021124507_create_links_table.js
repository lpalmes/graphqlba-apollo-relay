exports.up = function (knex) {
  return knex.schema.createTable('links', (table) => {
    table.increments('id').primary().unsigned()
    table.string('url')
    table.string('description')
    table.integer('votes')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('links')
}
