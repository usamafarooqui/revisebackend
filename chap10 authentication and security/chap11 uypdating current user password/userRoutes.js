router.patch('/updateMyPassword' , authController.protect, authController.updatePassword);