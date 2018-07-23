// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost:5435'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
