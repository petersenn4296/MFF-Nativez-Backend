exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {username: 'sarasmile', email: 'saragrazz44@gmail.com', tel: 5165513722, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true},
        {username: 'jslay', email: 'slater.jeff7@gmail.com', tel: 5164595425, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: false},
        {username: 'petersenn', email: 'petersenn4296', tel: 9706915030, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true}
      ])
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    });
};
