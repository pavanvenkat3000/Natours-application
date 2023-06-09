const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

//router.param('id', tourController.checkId);
router
  .route('/top-5-cheap')
  .get(tourController.alias5TopTours, tourController.getALLtours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getALLtours)
  .post(tourController.addNewtour);
router
  .route('/:id')
  .get(tourController.getTourWithId)
  .patch(tourController.updateTourWithId)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTourWithId
  );

module.exports = router;
