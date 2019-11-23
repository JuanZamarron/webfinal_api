const Event = require('../models/eventModel.js')

//Create event
const createEvent = function(req, res){
    const event = new Event(req.body)
    event.save().then(function(){
        res.send(event)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

//Get events
const getAllEvents = function(req, res){
    Event.find({}, function(err, event){
        if(!event){
          return res.status(404).send()
        }
        return res.send(event)
    })
}

//Update event
const updateEvent = function(req, res){ 
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["nameE", "date", "hourB", "hourE"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate){
        return res.status(400).send({
        error: 'Invalid update, only allowed updates: ' + allowedUpdates
        })
    }
    Event.findByIdAndUpdate(_id, req.body).then(function(event){
        if(!event){
            return res.status(404).send()
        }
        return res.send(event)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Delete event
const deleteEvent = function(req, res){
    const id = req.params.id
    Event.findOneAndRemove({ _id: id }).then(function(event,res){
        res.send({event: "deleted"});
    }).catch(function(error){
        res.status(500).send(error)
    })
}

module.exports = {
    createEvent: createEvent,
    getAllEvents: getAllEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}
