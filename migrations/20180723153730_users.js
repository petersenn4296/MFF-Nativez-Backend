exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments().notNullable()
    table.string('username', 20).notNullable().defaultTo('')
    table.string('email', 50).notNullable().defaultTo('')
    table.bigInteger('tel', 7)
    table.string('password').notNullable().defaultTo('')
    table.boolean('isOwner').notNullable().defaultTo(false)
  })// does this need to hashed or protected??
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').onDelete('CASCADE')
}
