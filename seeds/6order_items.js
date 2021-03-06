exports.seed = function(knex, Promise) {
    return knex('order_items').insert([
      {order_id: '1', item_id: '1', quantity: '1'},
      {order_id: '2', item_id: '2', quantity: '1'},
      {order_id: '3', item_id: '5', quantity: '1'},
      {order_id: '4', item_id: '6', quantity: '1'}
    ])
    .then(() => {
      return knex.raw("SELECT setval('order_items_id_seq', (SELECT MAX(id) FROM order_items))")
    });
};
