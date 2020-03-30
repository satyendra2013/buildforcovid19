const express = require('express');
const profileController = require('./../controllers/profileController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/get-suspected-profile')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfile
  );

router
  .route('/get-reported-profile')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfile
  );

router
  .route('/suspect/locality/:locality')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfilesFilterWise
  );

router
  .route('/suspect/city/:city')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfilesFilterWise
  );
router
  .route('/suspect/state/:state')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfilesFilterWise
  );

router
  .route('/suspect/country/:country')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfilesFilterWise
  );

router
  .route('/suspect/zipcode/:zipcode')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getSuspectedProfilesFilterWise
  );

router
  .route('/reported/locality/:locality')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfilesFilterwise
  );

router
  .route('/reported/city/:city')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfilesFilterwise
  );
router
  .route('/reported/state/:state')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfilesFilterwise
  );

router
  .route('/reported/country/:country')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfilesFilterwise
  );

router
  .route('/reported/zipcode/:zipcode')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo', 'hospitals'),
    profileController.getReportedProfilesFilterwise
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin', 'gov', 'ngo'),
    profileController.getAllProfile
  )
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin', 'gov', 'ngo'),
    profileController.setProfileUserIds,
    profileController.createProfile
  );

router
  .route('/:id')
  .get(profileController.getProfile)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin', 'gov'),
    profileController.updateProfile
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin', 'gov'),
    profileController.deleteProfile
  );

module.exports = router;
