const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const donateModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User profile must belong to a loggedIn user.']
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide your name.']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please provide your email.'],
      validate: {
        validator: function(val) {
          return validator.isEmail(val);
        },
        message: 'Please provide a valid email address.'
      }
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a valid 10 digit number.'],
      unique: true,
      trim: true,
      validate: {
        validator: function(val) {
          return validator.isMobilePhone(val, 'en-IN');
        },
        message: 'Please provide a valid 10 digit number.'
      }
    },
    donationAmount: {
      type: Number,
      required: [true, 'Please enter donation amount.']
    },
    status: {
      type: Boolean,
      default: false
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

const Donate = mongoose.model('Donate', donateModel);

module.exports = Donate;
