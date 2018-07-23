exports.up = function(knex, Promise) {
  return knex.schema.createTable('trucks', table => {
  table.increments().notNullable()
  table.integer('owner_id').unsigned().index().references('id').inTable('owners').onDelete('CASCADE')
  table.string('name').notNullable().defaultTo('')
  table.boolean('veggiefriendly')
  table.float('latitude')
  table.float('longitude')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trucks').references('owners.id').onDelete('CASCADE')
}
