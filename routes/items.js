const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a items, return the body of the request that was sent to your route
router.post('/:id', (req,res,next) => {
  //validate info coming in
  knex('items')
    .insert({
      "truck_id": req.body.truck_id,
      "price": req.body.price,
      "name": req.body.name
    })
    .returning('*')
    .then(() => {
            return knex('items')
        .select('items.id', 'price', 'name')
        // .join('items', 'trucks.id', '=', 'truck_id')
        .where('truck_id', req.params.id)
        .then(rows => {
          res.json(rows)
        })
        .catch(err => {
          next(err)
        })
    })
})
//
// router.get('/', (req,res,next) => {
//   knex('items')
//   .then(rows => {
//     res.json(rows)
//   })
//   .catch(err => {
//     next(err)
//   })
// })

// write a route for getting all of the items linked to one owner, respond with the parameter id and make sure the id is converted to a string before sending
// router.get('/:id', (req,res,next) => {
//   knex('items')
//   .where('truck_id',req.params.id)
//   .then((rows) => {
//     res.json(rows)
//   })
//   .catch((err) => {
//     next(err)
//   })
// })

// write a route for deleting one of the items, respond with the parameter id
router.delete('/:id/truck/:truckId', (req,res,next) => {
  knex('order_items')
  .where('item_id', req.params.id)
  .del()
  .then(() => {
    return knex ('items')
           .where('id', req.params.id)
           .del()
           .then(() => {
             return knex ('items')
                    .returning('*')
                    .then((data) => {
                      res.status(200).json()
                    })
           })
  })
    return knex('items')
    .where('id', req.params.id)
    .del()
      .then(() => {
        return knex('items')
               .where('truck_id', req.params.truckId)
               .then(data => {
                 res.status(200).json(data)
               })
      })
})
module.exports = router
