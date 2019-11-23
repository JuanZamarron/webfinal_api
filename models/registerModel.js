const mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
  userT:{
    organizer: Boolean,
    partipiant: Boolean
  },
  eventID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  services:[{
      service{
          type: String
      }
  }]
  assitant:{
      type: Number,
      required: true
  }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
