


// forgot password functionality
exports.forgotPassword = catchAsync(async(req, res, next)=>{
    // 1) get user based on posted email address
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError('no user found with this email address',404))
    }

    // 2) generate random reset token 
     // user model mein ja k iska instance method create krna prega
    // model se yahan instance function lengay
    const resetToken = user.createPasswordResetToken();
    // is createPasswordResetToken mein kuch save nahi kraya 
    // abhi save krana prega
    // validateBeforeSave:false se sare validators hat jayengay for checking
    await user.save({validateBeforeSave:false});

    // next();
    
   

});