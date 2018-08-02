const express = require('../node_modules/express')
const router = express.Router()
const knex = require('../knex')

// write a route for creating a trucks, return the body of the request that was sent to your route
router.post('/:id', (req,res,next) => {
  //validate info coming in
  knex('trucks')
    .insert({
      "owner_id": req.body.owner_id,
      "truckName": req.body.name,
      "img_url": req.body.img,
      "veggiefriendly": req.body.veggiefriendly,
      "is_open": req.body.is_open,
      "takes_orders": req.body.takes_orders,
      "latitude": req.body.latitude,
      "longitude": req.body.longitude
    })
    .then(() => {
      // res.send(data)
      return knex('trucks')
        .where('owner_id', req.params.id)
        .then(rows => {
          res.json(rows)
        })
        .catch(err => {
          next(err)
        })
    })
})

router.put('/:truckId/:value', (req,res,next) => {
  knex('trucks')
  .where('id', req.params.truckId)
  .limit(1)
  .update({'is_open': req.params.value})
  .returning('*')
  .then(() => {
    knex('trucks')
    .where('is_open', true)
    .then(rows => {
      res.json(rows)
    })
  })
})

//all open trucks

router.get('/', (req,res,next) => {
  knex('trucks')
  .where('is_open', true)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})

//get trucks menu
router.get('/menu/:id', (req,res,next) => {
  knex('items')
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

// trucks by owners id
router.get('/:id', (req,res,next) => {
  knex('trucks')
  .where('owner_id', req.params.id)
  .then(rows => {
    res.json(rows)
  })
  .catch(err => {
    next(err)
  })
})


/// big boy route returns all orders for one truck
router.get('/orders/:id', (req,res,next) => {
  knex('trucks')
  .select('username', 'tel', 'name', 'price', 'order_id', 'created_at', 'quantity', 'total')
  .join('orders', 'trucks.id', '=', 'orders.truck_id')
  .join('order_items', 'orders.id', '=', 'order_items.order_id')
  .join('items', 'item_id', '=', 'items.id')
  .join('users', 'orders.eater_id', '=', 'users.id')
  .where('orders.truck_id', req.params.id)
  .then((allInfo) => {
    // console.log('98 allInfo', allInfo)
    let ordersById = {
    }
    allInfo.forEach(order => {
      if (ordersById[order.order_id]){
        ordersById[order.order_id].items.push(
          {
            name: order.name,
            price: order.price,
            quantity: order.quantity
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
