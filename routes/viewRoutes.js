const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const donationPaymentController = require('../controllers/donationPaymentController');

const router = express.Router();

router.get(
  '/',
  donationPaymentController.createDonationPaymentCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);

router.get('/me', authController.protect, viewsController.getAccount);

router.get('/profile', authController.protect, viewsController.getMyProfile);
router.get(
  '/request-meal',
  authController.protect,
  viewsController.requestMeal
);

router.get(
  '/getting-symptoms',
  authController.protect,
  viewsController.reportYourself
);

router.get('/donate', authController.protect, viewsController.makeDonation);

router.get(
  '/request-ventilators',
  authController.protect,
  viewsController.requestVentilators
);

module.exports = router;
