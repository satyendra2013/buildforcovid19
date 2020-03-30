const express = require('express');
const mealController = require('./../controllers/requestMealController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/new-meal-request')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getAllNonAcceptedRequest
  );

router
  .route('/accepted-meal-request')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getAllAcceptedRequest
  );

router
  .route('/non-delivered-meal')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getAllNonDeliveredMeal
  );

router
  .route('/delivered-meal')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getAllDeliveredMeal
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getAllMealRequest
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.setProfileUserIds,
    mealController.createMealRequest
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.getOneMealRequest
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.updateMealRequest
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user', 'gov', 'ngo'),
    mealController.deleteMealRequest
  );

module.exports = router;
