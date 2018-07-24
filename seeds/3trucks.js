exports.seed = function(knex, Promise) {
      return knex('trucks').insert([
        {user_id: 1, name: 'sarasTruck', veggiefriendly: true, latitude: 40.016434, longitude: -105.282075},
        {user_id: 1, name: 'sarasOtherTruck', veggiefriendly: false, latitude: 40.019180, longitude: -105.278971},
        {user_id: 3, name: 'peteTruck', veggiefriendly: true, latitude: 40.016797, longitude: -105.275365}
      ])
    .then(() => {
      return knex.raw("SELECT setval('trucks_id_seq', (SELECT MAX(id) FROM trucks))")
    });
};
