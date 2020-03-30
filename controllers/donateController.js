const Donate = require('../models/donateModel');
const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllDonation = factory.getAll(Donate);

exports.setUserDetails = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: { $eq: req.user.id } });
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.name) req.body.name = req.user.name;
  if (!req.body.email) req.body.email = req.user.email;
  if (!req.body.contactNumber) req.body.contactNumber = profile.contactNumber;
  next();
});

exports.getDonation = factory.getOne(Donate);
exports.createDonation = factory.createOne(Donate);
exports.updateDonation = factory.updateOne(Donate);
exports.deleteDonation = factory.deleteOne(Donate);
