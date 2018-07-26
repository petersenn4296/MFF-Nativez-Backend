exports.seed = function(knex, Promise) {
      return knex('trucks').insert([
        {owner_id: 1, name: 'sarasTruck', img_url: '', veggiefriendly: true, isOpen: false, latitude: 40.016434, longitude: -105.282075},
        {owner_id: 1, name: 'sarasOtherTruck', img_url: '', veggiefriendly: false, isOpen: false, latitude: 40.019180, longitude: -105.278971},
        {owner_id: 3, name: 'peteTruck', img_url: '', veggiefriendly: true, isOpen: false, latitude: 40.016797, longitude: -105.275365}
      ])
    .then(() => {
      return knex.raw("SELECT setval('trucks_id_seq', (SELECT MAX(id) FROM trucks))")
    });
};
