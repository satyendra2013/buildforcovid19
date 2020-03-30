const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const ventilatorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User profile must belong to a loggedIn user.']
    },
    requestorType: {
      type: String,
      required: [true, 'Please provide organisation type.']
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide requirement quantity.']
    },
    name: {
      type: String,
      required: [true, 'please provide organisation name.']
    },
    email: {
      type: String,
      required: [true, 'Please provide organisation email.'],
      lowercase: true,
      validate: {
        validator: function(val) {
          return validator.isEmail(val);
        },
        message: 'Please provide organisation email.'
      }
    },
    contactNumber: {
      type: String,
      required: [true, 'Please enter the valid 10 digit contact number.'],
      unique: true,
      trim: true,
      validate: {
        validator: function(val) {
          return validator.isMobilePhone(val, 'en-IN');
        },
        message: 'Please provide a valid 10 digit number.'
      }
    },
    address: {
      type: String,
      required: [true, 'Please provide organisation address.']
    },
    city: {
      type: String,
      required: [true, 'Please provide organisation city.']
    },
    slugCity: String,
    state: {
      type: String,
      required: [true, 'Please provide organisation state.']
    },
    slugState: String,
    country: {
      type: String,
      required: [true, 'Please provide organisation country.']
    },
    slugCountry: String,
    zipCode: {
      type: String,
      trim: true,
      required: [true, 'Please provide organisation zip code.'],
      validate: {
        validator: function(val) {
          return validator.isPostalCode(val, 'any');
        },
        message: 'Please provide organisation zip code.'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    requestStatus: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//DOCUMENT MIDDLEWARE: runs before.save() and .create()
ventilatorSchema.pre('save', function(next) {
  this.slugName = slugify(this.name, { lower: true });
  this.slugCity = slugify(this.city, { lower: true });
  this.slugState = slugify(this.state, { lower: true });
  this.slugCountry = slugify(this.country, { lower: true });
  next();
});

const Ventilator = mongoose.model('Ventilator', ventilatorSchema);

module.exports = Ventilator;
