exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table => {
  table.increments().notNullable()
  table.integer('truck_id').unsigned().index().references('id').inTable('trucks').onDelete('CASCADE')
  table.integer('eater_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE')
  table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders').references('trucks.id').references('users.id').onDelete('CASCADE')
}
