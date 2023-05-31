// multer ko require kro
const multer = require('multer');

// here use multer 
// destination k yahan file save hogi
const upload = multer({dest:'public/img/users'})

// update data
// yahan multer ko as a middleware use kro
// photo form k ander us field ka naam hai jo ye photo hold kregi
// now to go user controller updateme
router.patch('/updateMe', upload.single('photo'), userController.updateMe);