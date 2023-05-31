


// delete data by user 
router.delete('/deleteMe', authController.protect , userController.deleteMe);