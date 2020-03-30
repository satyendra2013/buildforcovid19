const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User profile must belong to a loggedIn user.']
    },
    name: {
      type: String,
      required: [true, 'Requestor name is required.']
    },
    slugName: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(val) {
          return validator.isEmail(val);
        },
        message: 'Please provide a valid email address.'
      }
    },
    contactNumber: {
      type: String,
      required: [true, 'Please enter the valid 10 digit contact number.'],
      trim: true,
      validate: {
        validator: function(val) {
          return validator.isMobilePhone(val, 'en-IN');
        },
        message: 'Please provide a valid 10 digit number.'
      }
    },
    noOfPackage: {
      type: Number,
      required: [true, 'Please mention packet requirement.']
    },
    address: {
      type: String,
      required: [true, 'Please provide your address.']
    },
    locality: {
      type: String,
      required: [true, 'please provide your locality.']
    },
    slugLocality: String,
    city: {
      type: String,
      required: [true, 'Please provide your city.']
    },
    slugCity: String,
    state: {
      type: String,
      required: [true, 'Please provide your state.']
    },
    slugState: String,
    country: {
      type: String,
      required: [true, 'Please provide your country.']
    },
    slugCountry: String,
    zipCode: {
      type: String,
      trim: true,
      required: [true, 'Please provide zip code.'],
      validate: {
        validator: function(val) {
          return validator.isPostalCode(val, 'any');
        },
        message: 'Please provide a valid zip code.'
      }
    },
    acceptanceStatus: {
      type: Boolean,
      default: false
    },
    deliveryStatus: {
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

//DOCUMENT MIDDLEWARE: runs before.save() and .create()
mealSchema.pre('save', function(next) {
  this.slugName = slugify(this.name, { lower: true });
  this.slugLocality = slugify(this.name, { lower: true });
  this.slugCity = slugify(this.city, { lower: true });
  this.slugState = slugify(this.state, { lower: true });
  this.slugCountry = slugify(this.country, { lower: true });
  next();
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
