// import the review router 
const reviewRouter = require('./../routes/reviewRoutes')

// 2 jaga 1 hi code likha hua hai is se bachnay k liye

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

// jb bhi esa path hoga ye  review router handle krega q k wahan bilkul yehi code likha hua hai 
// duplicate code se bachnay k liye
// magr is mein tourId ki value nahi jayegi is k liye review router mein ja k mergeParams:true
router.use('/:tourId/reviews',reviewRouter);
