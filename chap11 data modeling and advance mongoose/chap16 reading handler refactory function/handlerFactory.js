const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');



// get one function 

exports.getOne = (Model , popOptions) => catchAsync(async (req, res , next) => {
  
  // populate ki waja se humain thori changes krni prengi                                             
  // yahan 404 ka error bnagay k in case id galat ho
  
  // const doc = await Model.findById(req.params.id).populate('reviews'); iske badle
  // query ko pehlay torengay
  let query = Model.findById(req.params.id);
  // phr agr popOptions huay tou isko try krengay
  if(popOptions) query = query.populate(popOptions);
  const doc = await query;

  if(!doc){
    return next(new AppError('No document found with that id',404) );
  }
  console.log(doc.status);
  res.status(200).json({
    status: 'success',
    data: {
      data:doc
    }
  });


});



// get all function 

exports.getAll = Model => catchAsync(async (req, res , next) => {
  // to allow for nested get reviews on tour
  let filter = {};
  if(req.params.tourId) filter ={tour:req.params.tourId};
 
  const features = new ApiFeatures(Model.find(filter), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const doc = await features.query;
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data:doc
    },
  });

});

