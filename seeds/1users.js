exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {username: 'sweetcow', email: 'sweetcow@gmail.com', tel: 3034557812, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true},
        {username: 'miguelmanuel', email: 'tacosdelnorte@gmail.com', tel: 3033109443, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true},
        {username: 'arepasgalore', email: 'areapshouse@gmail.com', tel: 3032334334, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true},
        {username: 'pizzaking', email: 'pizzaking@gmail.com', tel: 3032314922, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: true},
        {username: 'koda', email: 'lookin4food@gmail.com', tel: 9705667809, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: false},
        {username: 'beaujangles', email: 'beaujangles@gmail.com', tel: 3034126690, password: '$2a$10$WI5PDXlCP/Qu5LsH6QUzCOYUgd308UYRwTOcRG/gINyG54wHQ85hW', is_owner: false}
      ])
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    });
};
