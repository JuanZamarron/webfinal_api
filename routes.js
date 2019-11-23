const express = require('express')
const router = express.Router()
const cors = require('cors')

const auth = require("./middleware/auth.js");

const user = require("./controlers/userControler.js")

router.all('*', cors());

//USERS
router.post('/createUser', user.createUser); //Create one user
router.post('/login', user.login); //User login
router.post('/logout', auth, user.logout); //User logout
router.patch('/user/edit/:id', auth, user.updateUser); //Edit user information

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
