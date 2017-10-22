module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/db.sqlite`
    },
    useNullAsDefault: true
  }
}
