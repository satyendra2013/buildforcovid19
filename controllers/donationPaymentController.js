const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donate = require('../models/donateModel');
const DonationPayment = require('../models/donationPaymentModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1) Get user & donation
  const donationDetails = await Donate.find({
    user: { $eq: toString(req.user.id) }
  });
  console.log(donationDetails);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?user=${
      req.user.id
    }&amount=10`,
    cancel_url: `${req.protocol}://${req.get('host')}/donation`,
    customer_email: req.user.email,
    client_reference_id: req.user.id,
    line_items: [
      {
        name: 'Donation for COVID-19',
        description:
          'The donated amount will directly contributed to fighting authority of respective country from where donation is made.',
        images: [`https://images.app.goo.gl/VP1yeaMjLLxmnLkZ6`],
        amount: 10 * 100,
        currency: 'usd'
      }
    ]
  });

  // 3) CreAate session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createDonationPaymentCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it is UNSECURE: everyone can make donation without paying.
  const { user, amount } = req.query;

  if (!user && !amount) return next();
  await DonationPayment.create({ user, amount });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createDonation = factory.createOne(DonationPayment);
exports.getDonation = factory.getOne(DonationPayment);
exports.getAllDonations = factory.getAll(DonationPayment);
exports.updateDonation = factory.updateOne(DonationPayment);
exports.deleteDonation = factory.deleteOne(DonationPayment);
