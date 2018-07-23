exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', table => {
  table.increments().notNullable()
  table.string('username').notNullable().defaultTo('')
  table.string('password').notNullable().defaultTo('') // does this need to hashed or protected??
  table.string('email').notNullable().defaultTo('')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners')
}
