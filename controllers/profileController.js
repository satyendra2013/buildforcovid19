const Profile = require('../models/profileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllProfile = factory.getAll(Profile);
exports.setProfileUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.name) req.body.name = req.user.name;
  if (!req.body.email) req.body.email = req.user.email;
  next();
};
exports.getProfile = factory.getOne(Profile);
exports.createProfile = factory.createOne(Profile);
exports.updateProfile = factory.updateOne(Profile);
exports.deleteProfile = factory.deleteOne(Profile);

//For hospitals & gov
exports.getSuspectedProfile = catchAsync(async (req, res) => {
  const suspectedProfile = await Profile.find({
    suspected: { $eq: true }
  });

  res.status(200).json({
    status: 'success',
    results: suspectedProfile.length,
    data: {
      suspectedProfile
    }
  });
});

exports.getReportedProfile = catchAsync(async (req, res) => {
  const getReportedProfile = await Profile.find({
    reportMeToCoronaAuth: { $eq: true }
  });

  res.status(200).json({
    status: 'success',
    results: getReportedProfile.length,
    data: {
      getReportedProfile
    }
  });
});

exports.getSuspectedProfilesFilterWise = catchAsync(async (req, res, next) => {
  const locality = req.params.locality;
  const city = req.params.city;
  const state = req.params.state;
  const country = req.params.country;
  const zipCode = req.params.zipcode;

  let suspectedUserProfiles = '';

  if (locality)
    suspectedUserProfiles = await Profile.find({
      $and: [
        {
          slugLocality: { $eq: locality }
        },
        {
          suspected: { $eq: true }
        }
      ]
    });
  else if (city)
    suspectedUserProfiles = await Profile.find({
      $and: [
        {
          slugCity: { $eq: city }
        },
        {
          suspected: { $eq: true }
        }
      ]
    });
  else if (state)
    suspectedUserProfiles = await Profile.find({
      $and: [
        {
          slugState: { $eq: state }
        },
        {
          suspected: { $eq: true }
        }
      ]
    });
  else if (country)
    suspectedUserProfiles = await Profile.find({
      $and: [
        {
          slugCountry: { $eq: country }
        },
        {
          suspected: { $eq: true }
        }
      ]
    });
  else if (zipCode)
    suspectedUserProfiles = await Profile.find({
      $and: [
        {
          zipCode: { $eq: zipCode }
        },
        {
          suspected: { $eq: true }
        }
      ]
    });

  res.status(200).json({
    status: 'success',
    results: suspectedUserProfiles.length,
    data: {
      suspectedUserProfiles
    }
  });
});

exports.getReportedProfilesFilterwise = catchAsync(async (req, res, next) => {
  const locality = req.params.locality;
  const city = req.params.city;
  const state = req.params.state;
  const country = req.params.country;
  const zipCode = req.params.zipcode;

  let reportedUserProfiles = '';

  if (locality)
    reportedUserProfiles = await Profile.find({
      $and: [
        {
          slugLocality: { $eq: locality }
        },
        {
          reportMeToCoronaAuth: { $eq: true }
        }
      ]
    });
  else if (city)
    reportedUserProfiles = await Profile.find({
      $and: [
        {
          slugCity: { $eq: city }
        },
        {
          reportMeToCoronaAuth: { $eq: true }
        }
      ]
    });
  else if (state)
    reportedUserProfiles = await Profile.find({
      $and: [
        {
          slugState: { $eq: state }
        },
        {
          reportMeToCoronaAuth: { $eq: true }
        }
      ]
    });
  else if (country)
    reportedUserProfiles = await Profile.find({
      $and: [
        {
          slugCountry: { $eq: country }
        },
        {
          reportMeToCoronaAuth: { $eq: true }
        }
      ]
    });
  else if (zipCode)
    reportedUserProfiles = await Profile.find({
      $and: [
        {
          zipCode: { $eq: zipCode }
        },
        {
          reportMeToCoronaAuth: { $eq: true }
        }
      ]
    });

  res.status(200).json({
    status: 'success',
    results: reportedUserProfiles.length,
    data: {
      reportedUserProfiles
    }
  });
});
