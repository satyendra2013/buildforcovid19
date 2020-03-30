const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User profile must belong to a loggedIn user.']
    },
    name: {
      type: String,
      required: [true, 'A suspect must have name'],
      trim: true,
      minlength: [5, 'Suspect name can not be less than 5 characters.']
    },
    slugName: String,
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
    createdAt: {
      type: Date,
      default: Date.now()
    },
    suspected: {
      type: Boolean,
      default: false
    },
    reportMeToCoronaAuth: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Virtual populate for connecting profile and user through foreign & local key
profileSchema.virtual('userProfile', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user'
});

//DOCUMENT MIDDLEWARE: runs before.save() and .create()
profileSchema.pre('save', function(next) {
  this.slugName = slugify(this.name, { lower: true });
  this.slugLocality = slugify(this.name, { lower: true });
  this.slugCity = slugify(this.city, { lower: true });
  this.slugState = slugify(this.state, { lower: true });
  this.slugCountry = slugify(this.country, { lower: true });
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
