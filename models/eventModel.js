const mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
  nameO:{
    type: String,
    required: true
  },
  nameE:{
    type: String,
    required: true
  },
  date:{
      type: Date,
      required: true
  },
  hourB:{
      type: Number,
      required: true
  },
  hourE:{
      type: Number,
      require: true
  },
  services:[{
      service:{
          type: String,
          required: true
      },
      price:{
          type: Number,
          required: true
      },
      counter:{
          type: Number,
          required: true
      }
  }],
  eventT:{
      concierto: Boolean,
      fiesta: Boolean,
      conferencia: Boolean,
      deportivo: Boolean,
      otro: Boolean
  },
  assistant:{
      type: Number,
      required: true
  }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
