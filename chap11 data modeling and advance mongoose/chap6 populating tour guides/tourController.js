// hum ne peechay referencing kia hai guides ki field mein use bus data ki id show hogi 
// agr api mein chahtay ho wo id ki bajaye data aye tou isken liye populate krna prega 


// yahan 1 single tour ka data show hoga toy yehi populate krdengay

exports.getTour =  catchAsync(async (req, res , next) => {
    //                                              populate method hai is ke ander btana hai k konso field ko populate krna hai             
    // const tour = await Tour.findById(req.params.id).populate('guides');
    
    // agr chahtay ho k koi specific data of guides populate na ho tou
    const tour = await Tour.findById(req.params.id).populate({
        path:'guides', // kis field ko populate krna hai
        select: '-__v -passwordChangeAt' // - ka mtlb ye cheezain show nahi hongi
    });
  

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
