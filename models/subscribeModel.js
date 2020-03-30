const mongoose = require('mongoose');
const validator = require('validator');

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(val) {
          return validator.isEmail(val);
        },
        message: 'Please provide a valid email address.'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
