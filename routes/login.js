const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/', function (req, res, next) {
  const username = req.body.username
  const password = req.body.password
  if (username && password) {
    knex('users')
    .select('username', 'users.id', 'is_owner', 'password')
      .where('username', username)
      .then((result) => {
        if (result.length !== 1) {
          res.status(400).json({ errorMessage: 'Bad username. Flourine, Uranimum, Carbon, Potassium.' })
        }
        else if (bcrypt.compareSync(password, result[0].password)) {
          const userJson = {
            username: result[0].username,
            id: result[0].id,
            is_owner: result[0].is_owner
          }
          res.status(200).json(userJson)
        }
        else {
          res.status(400).json({ errorMessage: 'Bad password' })
        }
      })
  }
  else {
    res.status(400).json({ errorMessage: 'Must have username and password' })
  }
})

module.exports = router
