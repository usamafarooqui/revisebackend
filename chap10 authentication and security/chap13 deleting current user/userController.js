

  // delete by user 

  exports.deleteMe= catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false});
    res.status(204).json({
      status:'success',
      data:null
    })
  })
  exports.deleteUser = ( req , res) =>{
    res.status(500).json({
      status:'error',
      message:'this route is not yet define'
    })
  }

