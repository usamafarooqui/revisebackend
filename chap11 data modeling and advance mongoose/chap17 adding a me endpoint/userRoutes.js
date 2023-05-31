

// me endpoint
router.get('/me',authController.protect,userController.getMe,userController.getUser);