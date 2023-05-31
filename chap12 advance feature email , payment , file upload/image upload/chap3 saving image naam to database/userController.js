


  exports.updateMe = catchAsync(async(req, res , next)=>{
    //1) send errors if user post password data
    // file dekho yahan se 
    // console.log(req.file)
    if(req.body.password || req.body.passwordConfirm){
      return next(new AppError('This is not the route for passwords update.plz use /updateMyPassword'))
    } 

    // 2) update user documents 
    // filter unwanted fields name
    const filteredBody = filterObj(req.body , 'name' , 'email');
    // saving images to our database yahan bus name email k sath photo link kr rahay also user model mein ka k
  //   photo: {
  //     type:String,
  //     default:'default.jpg'
  // },

  
    if(req.file) filteredBody.photo = req.body.filename;
    const updatedUser = await User.findByIdAndUpdate(req.user.id , filteredBody , {
      new:true,
      runValidators:true
    })

    res.status(200).json({
      status:'success',
      data:{
        user:updatedUser
      }
    })
  });