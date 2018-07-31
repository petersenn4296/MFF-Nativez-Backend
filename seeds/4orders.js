exports.seed = function(knex, Promise) {
    return knex('orders').insert([
      {truck_id: '1', eater_id: '2', total: 0},
      {truck_id: '1', eater_id: '1', total: 0},
      {truck_id: '1', eater_id: '3', total: 0}
    ])
    .then(() => {
      return knex.raw("SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders))")
    });
};
