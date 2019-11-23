const express = require('express')
const router = express.Router()
const cors = require('cors')

const auth = require("./middleware/auth.js");

const user = require("./controlers/userControler.js")
const event = require('./controlers/eventControler.js')
const register = require('./controlers/registerControler.js')

router.all('*', cors());

//USERS
router.post('/createUser', user.createUser); //Create one user
router.post('/login', user.login); //User login
router.post('/logout', auth, user.logout); //User logout
router.patch('/user/edit/:id', auth, user.updateUser); //Edit user information

//EVENT
router.post('/createEvent', event.createEvent); // Create a new event

//REGISTER
router.post('/createRegister', register.createRegister); //Create new register

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
