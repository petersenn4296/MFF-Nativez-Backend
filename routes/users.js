const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')
const { hashSync } = require('bcryptjs')

/////////////////////MVC///////////////////////////
// const controllerz = require('../controller/login.js')
// router.post('/', controllerz.makeUser)
// router.put('/:id', controllerz.editUser)
// router.delete('/:id', controllerz.deleteUser)
/////////////////////MVC///////////////////////////



// write a route for creating a users, return the body of the request that was sent to your route
router.post('/', (req,res,next) => {
  knex('users')
    .where('username', req.body.username.toLowerCase())
    .then((result) => {
      if (result.length !== 0) {
        res.status(400).json({ errorMessage: 'Existing User' })
      }
      else {
        let hashWord = hashSync(req.body.password)
        knex('users')
          .insert({
            "username": req.body.username.toLowerCase(),
            "email": req.body.email,
            "tel": req.body.tel,
            "password": hashWord,
            "is_owner": req.body.is_owner
          })
          .returning('*')
          .then((data) => {
            const userJson = {
              username: data[0].username,
              id: data[0].id
            }
            res.status(200).json(userJson)
          })
          .catch((err) => {
            next(err)
          })
      }
    })
})

// write a patch route for editing a users, return an object with the id and the change that was requested
router.put('/:id', (req,res,next) => {
  knex('users')
    .where('id', req.params.id)
    .then((data) => {
      knex('users')
      .where('id', req.params.id)
      .limit(1)
      .update({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "is_owner": req.body.is_owner
      })
      .returning('*')
      .then((data) => {
        res.json(data[0])
      })
    })
    .catch((err) => {
      next(err)
    })
})

// write a route for deleting one of the users, respond with the parameter id
router.delete('/:id', (req,res,next) => {
  knex('users')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if(!row) return next()
    knex('users')
      .del()
      .where('id', req.params.id)
      .then(() => {
        res.send(`ID ${req.params.id} Deleted`)
      })
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router
