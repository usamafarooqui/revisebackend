

// real world mein reviews esay nahi bntay
// jesay postman mein bna dia

// reviews esay bnay gay l specific tour hoga iski specific id hogi aur uska review hoga aur jo user login hoga uski id hogi
// post/tour/dnjdsjn1298328/reviews
// get/tour/dnjdsjn1298328/reviews
// get/tour/dnjdsjn1298328/reviews/ 2732h2h22kj2 for a specific tour

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
