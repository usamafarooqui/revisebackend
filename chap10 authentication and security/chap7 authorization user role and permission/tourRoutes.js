router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)               // middleware mein ye 2 values send krengay
  .delete(authController.protect, authController.restrictTo('admin' , 'lead-guide'),tourController.deleteTour); // to give permission to login admin only uske bad model mein ja k admin ki field bnao