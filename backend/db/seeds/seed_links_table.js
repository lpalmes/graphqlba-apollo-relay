const casual = require('casual')

exports.seed = (knex, Promise) => {
  return knex('links').del().then(() => {
    const promises = Array(40).fill().map((_, id) => {
      return knex('links').insert([{
        id,
        url: casual.url,
        description: casual.sentence,
        votes: casual.integer(0, 500)
      }])
    })

    return Promise.all(promises)
  })
}
