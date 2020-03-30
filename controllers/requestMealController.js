const Meal = require('../models/requestMealModel');
const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.setProfileUserIds = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: { $eq: req.user.id } });

  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.name) req.body.name = req.user.name;
  if (!req.body.email) req.body.email = req.user.email;
  if (!req.body.contactNumber) req.body.contactNumber = profile.contactNumber;
  if (!req.body.noOfPackage) req.body.noOfPackage = profile.noOfPackage;
  if (!req.body.address) req.body.address = profile.address;
  if (!req.body.locality) req.body.locality = profile.locality;
  if (!req.body.city) req.body.city = profile.city;
  if (!req.body.state) req.body.state = profile.state;
  if (!req.body.country) req.body.country = profile.country;
  if (!req.body.zipCode) req.body.zipCode = profile.zipCode;

  next();
});

exports.getAllMealRequest = factory.getAll(Meal);
exports.getOneMealRequest = factory.getOne(Meal);
exports.createMealRequest = factory.createOne(Meal);
exports.updateMealRequest = factory.updateOne(Meal);
exports.deleteMealRequest = factory.deleteOne(Meal);

exports.getAllNonAcceptedRequest = catchAsync(async (req, res, next) => {
  const allNonAcceptedRequest = await Meal.find({
    acceptanceStatus: {
      $eq: false
    }
  });

  res.status(200).json({
    status: 'success',
    results: allNonAcceptedRequest.length,
    data: {
      allNonAcceptedRequest
    }
  });
});

exports.getAllAcceptedRequest = catchAsync(async (req, res, next) => {
  const allAcceptedRequest = await Meal.find({
    acceptanceStatus: {
      $eq: true
    }
  });

  res.status(200).json({
    status: 'success',
    results: allAcceptedRequest.length,
    data: {
      allAcceptedRequest
    }
  });
});

exports.getAllNonDeliveredMeal = catchAsync(async (req, res, next) => {
  const allNonDeliveredMeal = await Meal.find({
    deliveryStatus: {
      $eq: false
    }
  });

  res.status(200).json({
    status: 'success',
    results: allNonDeliveredMeal.length,
    data: {
      allNonDeliveredMeal
    }
  });
});

exports.getAllDeliveredMeal = catchAsync(async (req, res, next) => {
  const allDeliveredMeal = await Meal.find({
    deliveryStatus: {
      $eq: true
    }
  });

  res.status(200).json({
    status: 'success',
    results: allDeliveredMeal.length,
    data: {
      allDeliveredMeal
    }
  });
});
