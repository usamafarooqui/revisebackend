const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getTour =  catchAsync(async (req, res , next) => {
  
    const tour = await Tour.findById(req.params.id);
    // yahan 404 ka error bnagay k in case id galat ho
    // in javascript null means false

    if(!tour){
      // return lagana zaroori hai takay function foran return hojaye aur next line pe na jaye
      return next(new AppError('No tour found with that id',404) );
    }
    console.log(tour.status);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  
  
});