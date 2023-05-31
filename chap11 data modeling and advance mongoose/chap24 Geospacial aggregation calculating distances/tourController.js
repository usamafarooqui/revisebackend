



// geospatial aggregation
// calculte distance of each tour k humse kitna door hai 

exports.getDistances = catchAsync(async(req,res,next)=>{
  const {latlng , unit} = req.params;
  const [lat , lng] = latlng.split(',');

   //  yahan distance ko meter se kilometer mein convert krengay 
  const multiplier = unit ==='mi'? 0.000621371 : 0.001;


  if(!lat || !lng){
    next(new AppError('please provide the latitude and longitude in the format lat , lan',400))
  }

  const distances = await Tour.aggregate([
    {
      // geospatial aggregation mein bus 1 hi stage hota hai geoNear aur ye sab se pehla bhi hota hai
      // it takes 1 field as a geoSpatial index 
      // we did that start location
      // since we have only one field with geospatial index it automatically takes that
      // agr se ziada field hoti tou usko key value k through btana parta
      $geoNear:{
        // it is a mandotory fields ye near btaye ga k kahan se distance calculate krna hai
        // yahan se start location tk ka distance calculate hoga
        near:{
          type:'Point',
          coordinates:[lng*1,lat*1]
        },
        // this is the name of the field that will be create where all the calculated distances will be stored
        distanceField:'distance',
         //  yahan distance ko meter se kilometer mein convert krengay 
         distanceMultiplier:multiplier
      }
    },
    {
       
      // aur aur response mein bus tour name and distance return krengay na k pura tour data
      // project se data select krengay
      $project:{
        distance:1,
        name:1
      }
    }
  ]);

  res.status(200).json({
    status:'success',
    results:distances.length,
    data:{
      data:distances
    }
   })

})