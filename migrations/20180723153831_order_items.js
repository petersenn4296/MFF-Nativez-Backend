exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', table => {
  table.increments().notNullable()
  table.integer('order_id').unsigned().index().references('id').inTable('orders').onDelete('CASCADE')
  table.integer('item_id').unsigned().index().references('id').inTable('items').onDelete('CASCADE')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items').references('orders.id').references('items.id').onDelete('CASCADE')
}
