const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a order_items, return the body of the request that was sent to your route
router.post('/', (req,res,next) => {

  req.body.forEach(item => {
    return knex('order_items')
    .insert({
      "order_id": item.order_id,
      "item_id": item.item_id,
      "quantity": item.quantity
    })
    // .returning('*')
    .then((data) => (
      // console.log(data)
      res.status(200)
    ))
    .catch((err) => {
      next(err)
    })
  })
})

router.get('/', (req,res,next) => {
  knex('order_items')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})

// write a route for getting all of the order_items linked to one order_id, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/:id', (req,res,next) => {
  knex('order_items')
  .where('order_id',req.params.id)
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router
