const express = require('express');
const donationPaymentController = require('../controllers/donationPaymentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/', donationPaymentController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'gov'));

router
  .route('/')
  .get(donationPaymentController.getAllDonations)
  .post(donationPaymentController.createDonation);

router
  .route('/:id')
  .get(donationPaymentController.getDonation)
  .patch(donationPaymentController.updateDonation)
  .delete(donationPaymentController.deleteDonation);

module.exports = router;
