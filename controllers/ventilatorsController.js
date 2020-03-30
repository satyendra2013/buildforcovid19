const Ventilator = require('../models/ventilatorsModel');
const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllVentilator = factory.getAll(Ventilator);
exports.setVentilatorUserIds = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: { $eq: req.user.id } });

  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.name) req.body.name = req.user.name;
  if (!req.body.email) req.body.email = req.user.email;
  if (!req.body.contactNumber) req.body.contactNumber = profile.contactNumber;
  if (!req.body.address) req.body.address = profile.address;
  if (!req.body.city) req.body.city = profile.city;
  if (!req.body.state) req.body.state = profile.state;
  if (!req.body.country) req.body.country = profile.country;
  if (!req.body.zipCode) req.body.zipCode = profile.zipCode;
  next();
});
exports.getVentilator = factory.getOne(Ventilator);
exports.createVentilator = factory.createOne(Ventilator);
exports.updateVentilator = factory.updateOne(Ventilator);
exports.deleteVentilator = factory.deleteOne(Ventilator);
