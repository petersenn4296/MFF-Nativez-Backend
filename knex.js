let environment = process.env.NODE_ENV || 'development'
let config = require('./knexfile')[environment]
let knex = require('knex')(config)

module.exports = knex
