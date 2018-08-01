const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a orders
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


// write a route for getting all of the orders linked to one truck
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


router.delete('/:id/truck/:truckId', (req,res,next) => {
  knex('order_items')
  .where('order_id', req.params.id)
  .del()
  .then(() => {
    return knex ('orders')
           .where('id', req.params.id)
           .del()
           .then(() => {
               return knex('trucks')
               .select('username', 'tel', 'name', 'price', 'order_id', 'created_at', 'quantity', 'total')
               .join('orders', 'trucks.id', '=', 'orders.truck_id')
               .join('order_items', 'orders.id', '=', 'order_items.order_id')
               .join('items', 'item_id', '=', 'items.id')
               .join('users', 'orders.eater_id', '=', 'users.id')
               .where('orders.truck_id', req.params.truckId)
               .then((allInfo) => {
                 let ordersById = {
                 }
                 allInfo.forEach(order => {
                   if (ordersById[order.order_id]){
                     ordersById[order.order_id].items.push(
                       {
                         name: order.name,
                         price: order.price
                       })
                   } else {
                     ordersById[order.order_id] = {
                       name: order.username,
                       tel: order.tel,
                       created_at: order.created_at,
                       total: order.total,
                       items: [
                         {
                           name: order.name,
                           price: order.price,
                           quantity: order.quantity
                         }
                       ]
                     }
                   }
                 })
                 res.json(ordersById)
               })
               .catch((err) => {
                 next(err)
               })
           })
  })
})

module.exports = router
