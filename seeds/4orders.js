exports.seed = function(knex, Promise) {
    return knex('orders').insert([
      {truck_id: '1', eater_id: '2'},
      {truck_id: '1', eater_id: '1'},
      {truck_id: '1', eater_id: '3'}
    ])
    .then(() => {
      return knex.raw("SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders))")
    });
};
