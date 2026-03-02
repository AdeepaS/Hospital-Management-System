const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  workingDays: {
    type: [String],
    required: true,
    validate: {
      validator: function(days) {
        const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.every(day => validDays.includes(day));
      },
      message: 'Invalid working day'
    }
  },
  workingHours: {
    start: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    end: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  }
}, { timestamps: true, collection: 'doctors' });

module.exports = mongoose.model('Doctor', doctorSchema);
