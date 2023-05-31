
// yahan se routes bnao tours lenay k liye 
// now go to view Controller

router.get('/my-tours' , authController.protect , viewController.getMyTours)