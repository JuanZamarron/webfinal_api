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
  description: {
      type: String,
      required: true
  },
  date:{
      type: Date,
      required: true
  },
  hourB:{
      type: String,
      required: true
  },
  hourE:{
      type: String,
      require: true
  },
  cover:{
      type: Number,
      required: true
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
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  status: {
      type: Boolean,
      required: true
  }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
