const Event = require('../models/eventModel.js')

const createEvent = function(req, res){
    const event = new Event(req.body)
    event.save().then(function(){
        res.send(event)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

module.exports = {
    createEvent: createEvent
}
