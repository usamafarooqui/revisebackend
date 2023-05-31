


// password reset functionality 
exports.resetPassword = catchAsync(async(req, res, next) => { 
    // 1) get user based on the token
    // token email mein simple hai but database mein crypted hai usko match krnay k liye simple password ko bhi enrypt krengay
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // user ko token k zariye find krengay aur dekhaingay k token expire hai k nahi
    //                                                                  password reset dekhaingay agr ye greater hai majooda date se tou yani token expire nahi hua
    const user = await User.findOne({passwordResetToken: hashedToken , passwordResetExpires:{$gt:Date.now()}});

    // 2) set new password if toekn has not expired and there is a user set new password 

    if(!user){
        return next(new AppError('token is invalid or has expired ',400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // ye sab uper body ko modify krega magr save nahi krega
    // save sare validators bhi run krega update nahi krega ye
    await user.save();



    // 3) update changepasswordAt property for the user  (do in model)

    // 4)  log the user in and send jwt
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token

    })
});

