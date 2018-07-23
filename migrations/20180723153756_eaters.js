exports.up = function(knex, Promise) {
  return knex.schema.createTable('eaters', table => {
    table.increments().notNullable()
    table.string('name').notNullable().defaultTo('')
    table.string('email').notNullable().defaultTo('')
    table.string('username').notNullable().defaultTo('')
    table.string('password').notNullable().defaultTo('')
  })// does this need to hashed or protected??
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('eaters').onDelete('CASCADE')
}
