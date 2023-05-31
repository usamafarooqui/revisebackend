


// update data
// yahan multer ko as a middleware use kro
// photo form k ander us field ka naam hai jo ye photo hold kregi
// now to go user controller updateme
router.patch('/updateMe',userController.uploadUserPhoto, userController.updateMe);