exports.seed = function(knex, Promise) {
      return knex('trucks').insert([
        {owner_id: 1, truckName: 'sarasTruck', img_url: '', veggiefriendly: true, is_open: true, takes_orders: true, latitude: 40.016434, longitude: -105.282075},
        {owner_id: 1, truckName: 'sarasOtherTruck', img_url: '', veggiefriendly: false, is_open: false, takes_orders: true, latitude: 40.019180, longitude: -105.278971},
        {owner_id: 3, truckName: 'peteTruck', img_url: '', veggiefriendly: true, is_open: true, takes_orders: true, latitude: 40.016797, longitude: -105.275365}
      ])
    .then(() => {
      return knex.raw("SELECT setval('trucks_id_seq', (SELECT MAX(id) FROM trucks))")
    });
};
