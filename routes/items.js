const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a items, return the body of the request that was sent to your route
router.post('/', (req,res,next) => {
  //validate info coming in
  knex('items')
    .insert({
      "truck_id": req.body.truck_id,
      "price": req.body.price,
      "name": req.body.name
    })
    .returning('*')
    .then((data) => (
      res.send(data)
    ))
    .catch((err) => {
      next(err)
    })
})

router.get('/', (req,res,next) => {
  knex('items')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})

// write a route for getting all of the items linked to one owner, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/:id', (req,res,next) => {
  knex('items')
  .where('truck_id',req.params.id)
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
    next(err)
  })
})

router.put('/:id', (req,res,next) => {
  knex('items')
    .where('id', req.params.id)
    .then((data) => {
      knex('items')
      .where('id', req.params.id)
      .limit(1)
      .update({
        "truck_id": req.body.truck_id,
        "price": req.body.price,
        "name": req.body.name
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

// write a route for deleting one of the items, respond with the parameter id
router.delete('/:id', (req,res,next) => {
  knex('items')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if(!row) return next()
    knex('items')
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
