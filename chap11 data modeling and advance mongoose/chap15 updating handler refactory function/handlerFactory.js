const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');





// update function 

exports.updateOne = Model => catchAsync(async (req, res , next) => {
 
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if(!doc){
    return next(new AppError('No document found with that id',404) );
  }
  res.status(200).json({
    status: 'success',
    data: {
      data:doc
    },
  });

});


// create function

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });

});
