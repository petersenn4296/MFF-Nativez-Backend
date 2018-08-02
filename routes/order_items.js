const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// eater confirms order adds item to orders and navigates to logged in eater
router.post('/', (req,res,next) => {
  req.body.forEach(item => {
    return knex('order_items')
    .insert({
      "order_id": item.order_id,
      "item_id": item.item_id,
      "quantity": item.quantity
    })
    .then((data) => (
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
