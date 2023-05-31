

// geospatial query work here

exports.getToursWithin =catchAsync(async(req,res , next)=>{
    // destructure variables from param query
    const {distance , latlng , unit} = req.params;
    // get coordinates from lat-lng
    const [lat , lng] = latlng.split(',');
  
    // yahan distance ko convert kro radian meom q k centerSphere radian mein value leta hai
    const radius = unit === 'mi'? distance/3963.2:distance/6378.1;
  
    if(!lat || !lng){
      next(new AppError('please provide the latitude and longitude in the format lat , lan',400))
    }
  
    // yahan filter object lagaingay
    // start location lengay q k us mein coordinates han hr tour k kahan se start hai
    // gerowithin mongo ka special operator hai jo area ko search krega
    // ye center sphere leta hai jis mein coordinates aur radius hota hai k q jb seach krega tou us circle k radius mein jitnay tour hongay sab dega
    // distance ko esy nahi de saktay ye radian mein value leta hai is le isko convert krna parega
    // jis field mein geospatial data hai usko index bhi krna prega yahan start location
    const tours = await Tour.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}});
  
   res.status(200).json({
    status:'success',
    results:tours.length,
    data:{
      data:tours
    }
   })
  });