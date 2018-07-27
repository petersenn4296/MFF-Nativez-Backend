const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a trucks, return the body of the request that was sent to your route
router.post('/', (req,res,next) => {
  //validate info coming in
  knex('trucks')
    .insert({
      "user_id": req.body.user_id,
      "name": req.body.name,
      "veggiefriendly": req.body.veggiefriendly,
      "img_url": req.body.img,
      "latitude": req.body.latitude,
      "longitude": req.body.longitude
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
  knex('trucks')
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})

// write a route for getting all of the trucks linked to one owner, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/:id', (req,res,next) => {
let order_items = []

  knex('trucks')
  .select('username', 'tel', 'name', 'price', 'order_id', 'created_at')
  .join('orders', 'trucks.id', '=', 'orders.truck_id')
  .join('order_items', 'orders.id', '=', 'order_items.order_id')
  .join('items', 'item_id', '=', 'items.id')
  .join('users', 'orders.eater_id', '=', 'users.id')
  .where('orders.truck_id', req.params.id)
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
          items: [
            {
              name: order.name,
              price: order.price
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

// write a route for getting one of the trucks, respond with the parameter id and make sure the id is converted to a string before sending
router.get('/truck/:id', (req,res,next) => {
  knex('trucks')
  .where('id',req.params.id)
  .then((rows) => {
    res.json(rows)
  })
  .catch((err) => {
    next(err)
  })
})

// write a route for deleting one of the trucks, respond with the parameter id
router.delete('/:id', (req,res,next) => {
  knex('trucks')
  .where('id', req.params.id)
  .first()
  .then((row) => {
    if(!row) return next()
    knex('trucks')
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
