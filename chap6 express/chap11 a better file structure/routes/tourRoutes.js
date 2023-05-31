const express = require('express');
// import functions / controller from controller files
const tourController = require('../controllers/tourController')


const router = express.Router();
// tourRouter.route('/').get(getAllTours).post(createTour);

// tourRouter
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);


// tourRoutes ko change kr k router kro for standard


router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);


// is router ko export krdo

module.exports = router;