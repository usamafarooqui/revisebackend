// yahan get Tour mein reviews ko ko populate krengay 

exports.getTour =  catchAsync(async (req, res , next) => {
    //                                                      ye populate kia hao      
    const tour = await Tour.findById(req.params.id).populate('reviews');
    // yahan 404 ka error bnagay k in case id galat ho

    if(!tour){
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