exports.seed = function(knex, Promise) {
      return knex('trucks').insert([
        {owner_id: 1, truckName: 'Sweet Cow Ice Cream', img_url: '', veggiefriendly: true, is_open: true, takes_orders: true, latitude: 40.016797, longitude: -105.275365},
        {owner_id: 2, truckName: 'Tacos Del Norte', img_url: '', veggiefriendly: true, is_open: true, takes_orders: true, latitude: 40.016797, longitude: -105.275365},
        {owner_id: 3, truckName: 'Aprepas House', img_url: '', veggiefriendly: true, is_open: false, takes_orders: true, latitude: 40.016797, longitude: -105.275365},
        {owner_id: 4, truckName: 'Wheels on Fire Pizza', img_url: '', veggiefriendly: true, is_open: false, takes_orders: true, latitude: 40.016797, longitude: -105.275365},
        {owner_id: 4, truckName: 'Wheel & Whisk Cafe', img_url: '', veggiefriendly: true, is_open: true, takes_orders: true, latitude: 40.016797, longitude: -105.275365}
      ])
    .then(() => {
      return knex.raw("SELECT setval('trucks_id_seq', (SELECT MAX(id) FROM trucks))")
    });
};
