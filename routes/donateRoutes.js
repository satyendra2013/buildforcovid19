const express = require('express');
const donateController = require('./../controllers/donateController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'gov'),
    donateController.getAllDonation
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user', 'ngo'),
    donateController.setUserDetails,
    donateController.createDonation
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'gov'),
    donateController.getDonation
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'gov'),
    donateController.updateDonation
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'gov'),
    donateController.deleteDonation
  );

module.exports = router;
