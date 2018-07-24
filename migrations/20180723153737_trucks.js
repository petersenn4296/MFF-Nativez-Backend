exports.up = function(knex, Promise) {
  return knex.schema.createTable('trucks', table => {
  table.increments().notNullable()
  table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE')
  table.string('name').notNullable().defaultTo('')
  table.boolean('veggiefriendly')
  table.float('latitude')
  table.float('longitude')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trucks').references('user.id').onDelete('CASCADE')
}
