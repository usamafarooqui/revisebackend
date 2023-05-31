// send token a 1 refactory function

const createSendToken = (user , statusCode , res)=>{
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }

    })
}



// update password without forgeting and reseting 

exports.updatePassword = catchAsync(async(req, res, next)=>{
    // 1) get user from the collections 
    // .select('+password'); se password bhi mil jayega by default ye model mein off hai
    const user = await User.findById(req.user.id).select('+password');

    // 2) check if posted current password is correct 
    if(!(await user.correctPassword(req.body.passwordCurrent , user.password))){
        return next(new AppError('your current password is wrong ', 401));
    }

    // 3) if password is correct then update 
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save(); // user.findbyidandupdate will not work q k na validators chalaingay na pre save middleware


    // login user and send jwt
    createSendToken(user , 200 , res);
})