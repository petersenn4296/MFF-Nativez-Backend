exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('items').insert([
        {truck_id: '1', price: '4', name: 'taco'},
        {truck_id: '2', price: '8', name: 'burger'},
        {truck_id: '3', price: '12', name: 'fish'}
      ])
    .then(() => {
      return knex.raw("SELECT setval('items_id_seq', (SELECT MAX(id) FROM items))")
    });
};
