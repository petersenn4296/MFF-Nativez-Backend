'use strict';

// require('dotenv').config()
//require and use express, require body-parser, create a port
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5445
const knex = require('./knex')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')


// Use body parser https://www.npmjs.com/package/body-parser
// See Express/Connect top-level generic for code to use here
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Routers
const login = require('./routes/login')
const users = require('./routes/users')
const trucks = require('./routes/trucks')
const items = require('./routes/items')
const orders = require('./routes/orders')
const order_items = require('./routes/order_items')
// const index = require('./routes/index')

//use Routers
app.use('/login', login)
app.use('/users', users)
app.use('/trucks', trucks)
app.use('/items', items)
app.use('/orders', orders)
app.use('/order_items', order_items)

app.get('/', (req,res,next) => {
  res.send('diz food app server')
})
// write a catch all route that will respond with status of 418
app.use((req,res,next) => {
  res.status(418).send({error: {message: "418 you teapot"}})
})


/* don't change the code below this line */
app.listen(port, function(){
  console.log("listening on port", port);
})


// your server should be named app since that is what is being exported here
module.exports = app;
