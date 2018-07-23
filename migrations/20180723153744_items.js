exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
  table.increments().notNullable()
  table.integer('truck_id').unsigned().index().references('id').inTable('trucks').onDelete('CASCADE')
  table.integer('price')
  table.string('name').notNullable().defaultTo('')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trucks').references('trucks.id').onDelete('CASCADE')
}
