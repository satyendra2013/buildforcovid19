const moongoose = require('mongoose');

const donationPaymentSchema = new moongoose.Schema({
  user: {
    type: moongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Donation must belong to a user!']
  },
  amount: {
    type: Number,
    require: [true, 'Donation must have an amount']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

donationPaymentSchema.pre(/^find/, function(next) {
  this.populate('user');
  next();
});

const DonationPayment = moongoose.model(
  'DonationPayment',
  donationPaymentSchema
);

module.exports = DonationPayment;
