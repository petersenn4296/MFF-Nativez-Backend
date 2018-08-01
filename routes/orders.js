const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a orders, return the body of the request that was sent to your route
router.post('/', (req,res,next) => {
  //validate info coming in
  knex('orders')
    .insert({
      "truck_id": req.body.truck_id,
      "eater_id": req.body.eater_id,
      "total": req.body.total
    })
    .returning('*')
    .then((data) => (
      res.status(200).json(data[0].id)
    ))
    .catch((err) => {
      next(err)
    })
})

router.get('/', (req,res,next) => {
  knex('orders')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})

// write a route for getting all of the orders linked to one truck, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/:id', (req,res,next) => {
  knex('orders')
  .where('truck_id',req.params.id)
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
    next(err)
  })
})

// write a route for getting all of the one order by id, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/order/:id', (req,res,next) => {
  knex('orders')
  .where('id',req.params.id)
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
    next(err)
  })
})

// write a route for deleting one of the orders, respond with the parameter id
// router.delete('/:id', (req,res,next) => {
//   console.log('59 back orders', req.params.id);
//   knex('orders')
//   .where('id', req.params.id)
//   .first()
//   .then((row) => {
//     if(!row) return next()
//     knex('orders')
//       .del()
//       .where('id', req.params.id)
//       .then(() => {
//         res.send(`ID ${req.params.id} Deleted`)
//       })
//   })
//   .catch((err) => {
//     next(err)
//   })
// })

router.delete('/:id/truck/:truckId', (req,res,next) => {
  knex('order_items')
  .where('order_id', req.params.id)
  .del()
  .then(() => {
    return knex ('orders')
           .where('id', req.params.id)
           .del()
           .then(() => {
             return knex ('orders')
                    .where('truck_id', req.params.truckId)
                    .returning('*')
                    .then((data) => {
                      res.status(200).json(data)
                    })
           })
  })

})

module.exports = router
