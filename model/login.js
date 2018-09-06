const knex = require('../knex')
const bcrypt = require('bcryptjs')


function logIn(username, password) {
  let response
  let errorMessage = []
  return knex('users')
  .select('username', 'users.id', 'is_owner', 'password')
  .where('username', username)
  .then((result) => {
    if(result.length !== 1) {
      errorMessage.push('User not found')
      response = {errorMessage}
     } else if (bcrypt.compareSync(password, result[0].password)) {
      const userJson = {
        username: result[0].username,
        id: result[0].id,
        is_owner: result[0].is_owner
      }
      response = userJson
    }
    else {
      errorMessage.push('Bad password')
      response = {errorMessage}
    }
    return response
  })
}

module.exports = {logIn}
