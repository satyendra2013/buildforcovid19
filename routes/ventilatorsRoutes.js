const express = require('express');
const ventilatorsController = require('./../controllers/ventilatorsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(
  authController.protect,
  authController.restrictTo('admin', 'gov', 'ngo', 'hospitals')
);

router
  .route('/')
  .get(ventilatorsController.getAllVentilator)
  .post(
    ventilatorsController.setVentilatorUserIds,
    ventilatorsController.createVentilator
  );

router
  .route('/:id')
  .get(ventilatorsController.getVentilator)
  .patch(ventilatorsController.updateVentilator)
  .delete(ventilatorsController.deleteVentilator);

module.exports = router;
