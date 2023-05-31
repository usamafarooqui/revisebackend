// multer ka sara kaam controller mein krengay 
const multer = require('multer');

// lets create a storage for multer
// store file in file system instead of buffer buffer mein bad mein save krengay
const multerStorage = multer.diskStorage({
    // req req hi hai file jo file ayegi cb is call back function
    destination:(req,file,cb)=>{
      // null agr error na ho tou baki path k image kahan save hogi
      cb(null,'public/img/users')
    },
    // yahan file ko naam dengay
    filename:(req,file,cb)=>{
      // lets extract extension of file
      // mimetype se extension mil jayegi
      const ext = file.mimetype.split('/')[1];
      // req.user.id jo currently logged in user hoga wo ayega  
      cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
    }
      
  });

// lets make a filter k sirf image hi upload hon
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
      // yani koi error nahi
      cb(null,true)
    }else{
      // error hai cb mein error jayega
      cb(new AppError('Not an image please upload a image',400),false)
    }
  }

// here use multer 

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


// jo photo  upload.single('photo') ka middleware function bna
// usko update me k ander as  a middleware use kro
exports.uploadUserPhoto =  upload.single('photo');