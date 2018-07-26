exports.up = function(knex, Promise) {
  return knex.schema.createTable('trucks', table => {
  table.increments().notNullable()
  table.integer('owner_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE')
  table.string('name').notNullable().defaultTo('')
  table.string('img_url',255).defaultTo('https://image.freepik.com/free-vector/retro-food-truck_23-2147530708.jpg')
  table.boolean('veggiefriendly')
  table.boolean('is_open')
  table.boolean('takes_orders')
  table.float('latitude')
  table.float('longitude')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trucks').references('user.id').onDelete('CASCADE')
}
