// forgot password
router.post('/forgotPassword' , authController.forgotPassword);
// reset password
router.patch('/resetPassword/:token' , authController.resetPassword);