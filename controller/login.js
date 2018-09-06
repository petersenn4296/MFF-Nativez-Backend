const model = require('../model/login.js')

function logIn(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  if(!username || !password) {
    res.status(400).json({ errorMessage: 'Please enter all fields' })
  } else {
    model.logIn(username, password)
    .then((result) => {
      if(result.errorMessage) {
        res.status(400).json(result.errorMessage)
      } else {
        res.status(200).json(result)
      }
    })
  }
}

module.exports = {logIn}
