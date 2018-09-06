require('dotenv').config()

const express = require('express')
const router = express.Router()
const controllerz = require('../controller/login.js')

router.post('/', controllerz.logIn)

module.exports = router
