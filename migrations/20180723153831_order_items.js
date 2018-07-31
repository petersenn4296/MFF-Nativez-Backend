exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', table => {
  table.increments().notNullable()
  table.integer('order_id').unsigned().index().references('id').inTable('orders')
  table.integer('item_id').unsigned().index().references('id').inTable('items')
  table.integer('quantity').unsigned().index().defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items').references('orders.id').references('items.id').onDelete('CASCADE')
}
