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
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

//Get events by id
const getEventsById = function(req, res){
    const id = req.params.id
    Event.findById(id).then(function(event){
        if(!event){
            return res.status(404).send()
        }
        return res.send(event)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

//Get events createdby
const getEventsCreatedBy = function(req, res){
    Event.find({ createdBy: req.user._id }).then(function(events){
        if(!events){
            return res.status(404).send()
        }
        return res.send(events)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

//Update event
const updateEvent = function(req, res){ 
    const _id = req.params.id
    const updates = Object.keys({
        ...req.body,
        nameO: req.user.name
    })
    const allowedUpdates = ["assistant", "services"]
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

//Update event by creator
const updateEventCreatedBy = function(req, res){ 
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["nameE", "date", "hourB", "hourE", "status"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate){
        return res.status(400).send({
        error: 'Invalid update, only allowed updates: ' + allowedUpdates
        })
    }
    Event.findOneAndUpdate({_id, createdBy: req.user._id}, req.body).then(function(event){
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
    Event.findOneAndDelete({ _id, createdBy: req.user._id }).then(function(event){
        if(!event){
            return res.status(404).send()
        }
        return res.send(event)
    }).catch(function(error){
        res.status(505).send({ error: error })
    })
}

module.exports = {
    createEvent: createEvent,
    getAllEvents: getAllEvents,
    getEventsById: getEventsById,
    getEventsCreatedBy: getEventsCreatedBy,
    updateEvent: updateEvent,
    updateEventCreatedBy: updateEventCreatedBy,
    deleteEvent: deleteEvent
}
