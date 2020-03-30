const express = require('express');
const subscribeController = require('./../controllers/subscribeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'gov'),
    subscribeController.getAllSubscriber
  )
  .post(subscribeController.createSubscriber);

router.use(authController.protect, authController.restrictTo('admin', 'gov'));

router
  .route('/:id')
  .get(subscribeController.getSubscriber)
  .patch(subscribeController.updateSubscriber)
  .delete(subscribeController.deleteSubscriber);

module.exports = router;
