exports.seed = function(knex, Promise) {
    return knex('orders').insert([
      {truck_id: '1', eater_id: '5', total: 4},
      {truck_id: '1', eater_id: '6', total: 6},
      {truck_id: '2', eater_id: '5', total: 3},
      {truck_id: '2', eater_id: '6', total: 3},
    ])
    .then(() => {
      return knex.raw("SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders))")
    });
};
