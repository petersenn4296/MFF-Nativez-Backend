exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table => {
  table.increments().notNullable()
  table.integer('truck_id').unsigned().index().references('id').inTable('trucks').onDelete('CASCADE')
  table.integer('eaters_id').unsigned().index().references('id').inTable('eaters').onDelete('CASCADE')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders').references('trucks.id').references('eaters.id').onDelete('CASCADE')
}
