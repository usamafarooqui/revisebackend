const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharpe = require('sharp')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

// resize krnay k liye photo ko save bhi nahi krengay usko buffer mein rakh k wohi resize krdengay best practice
const multerStorage= multer.memoryStorage();

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
// ab multiple phots upload krnay k liye

exports.uploadTourImages =  upload.fields([
   // imageCover aur image database se field k naam hai 
  {name:'imageCover',maxCount:1},
  {name:'images',maxCount:5},
]);

// single file upload k liye
// upload.single('image') req.file
// array of imaeges for the same fields  req.files
// upload.array('images',5)

exports.resizeTourImages = (req,res,next)=>{
  // agalay lecture mein iska kaam hai
  console.log(req.files)
  next()
}