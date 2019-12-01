const express = require('express')
const router = express.Router()
const cors = require('cors')

const auth = require("./middleware/auth.js");

const user = require("./controlers/userControler.js")
const event = require('./controlers/eventControler.js')
const register = require('./controlers/registerControler.js')

router.all('*', cors())

//USERS
router.post('/createUser', user.createUser) //Create one user
router.post('/login', user.login) //User login
router.post('/logout', auth, user.logout) //User logout
router.patch('/user/edit', auth, user.updateUser) //Edit user information

//EVENT
router.post('/createEvent', auth, event.createEvent) // Create a new event
router.get('/getAllEvents', auth, event.getAllEvents) //Get all events
router.get('/getEventId/:id', auth, event.getEventsById) //Get event by id
router.get('/getEventCreatedBy', auth, event.getEventsCreatedBy) //Get events created by
router.patch('/event/edit/:id', auth, event.updateEvent) //Update events assistant and service count
router.patch('/event/editCreatedBy/:id', auth, event.updateEventCreatedBy) //Update events by the creator
router.delete('/event/delete/:id', auth, event.deleteEvent) //Delete event

//REGISTER
router.post('/createRegister', auth, register.createRegister) //Create new register
router.get('/getRegisterUserId', auth, register.getRegisterByUserID) //Get register by user id
router.patch('/updateRegister', auth, register.updateRegister) //Update register services
router.delete('/register/delete/:id', auth, register.deleteRegister) //Delete register

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
