const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  res.status(200).render('overview', {
    title: 'Welcome to your profile'
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account'
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyProfile = catchAsync(async (req, res) => {
  const profiles = await Profile.find({ user: { $eq: req.user.id } });

  res.status(200).render('profile', {
    title: 'Complete profile',
    profiles
  });
});

exports.requestMeal = catchAsync(async (req, res) => {
  const profiles = await Profile.find({ user: { $eq: req.user.id } });
  res.status(200).render('meal', {
    title: 'Request',
    profiles
  });
});

exports.reportYourself = catchAsync(async (req, res) => {
  const profiles = await Profile.find({ user: { $eq: req.user.id } });
  console.log(profiles);
  res.status(200).render('report', {
    title: 'Report yourself',
    profiles
  });
});

exports.makeDonation = catchAsync(async (req, res) => {
  const profiles = await Profile.find({ user: { $eq: req.user.id } });
  console.log(profiles);
  res.status(200).render('donate', {
    title: 'Make Donation',
    profiles
  });
});

exports.requestVentilators = catchAsync(async (req, res) => {
  const profiles = await Profile.find({ user: { $eq: req.user.id } });
  console.log(profiles);
  res.status(200).render('ventilator', {
    title: 'Request Ventilators',
    profiles
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
