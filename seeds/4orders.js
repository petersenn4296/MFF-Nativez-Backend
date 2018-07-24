exports.seed = function(knex, Promise) {
    return knex('orders').insert([
      {truck_id: '1', user_id: '2'},
      {truck_id: '2', user_id: '2'},
      {truck_id: '3', user_id: '2'}
    ])
    .then(() => {
      return knex.raw("SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders))")
    });
};
