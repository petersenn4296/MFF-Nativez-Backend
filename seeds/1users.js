exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {name: 'Sara', email: 'saragrazz44@gmail.com', username: 'saraSmile', password: '123', isOwner: true},
        {name: 'Jeff', email: 'slater.jeff7@gmail.com', username: 'jSlay', password: '123', isOwner: false},
        {name: 'Peter', email: 'petersenn4296', username: 'petersenn', password: '123', isOwner: true}
      ])
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    });
};
