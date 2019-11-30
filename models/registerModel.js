const mongoose = require('mongoose')

var registerSchema = new mongoose.Schema({
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
      service:{
          type: String,
          required: true
      },
      price:{
        type: String,
        required: true
      }
  }],
  totalprice:{
    type: Number,
    required: true
  }
})

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
