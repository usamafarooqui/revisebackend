// forgot password functionality
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) get user based on posted email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('no user found with this email address'),404)
    }

    // 2) generate random reset token 
    // user model mein ja k iska instance method create krna prega
    // model se yahan instance function lengay
    const resetToken = user.createPasswordResetToken();
    // is createPasswordResetToken mein kuch save nahi kraya 
    // abhi save krana prega
    // validateBeforeSave:false se sare validators hat jayengay for checking
    await user.save({ validateBeforeSave: false });

    // 3) email to users mail 
    // req.protocol se humain http ya https mil jayega
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    console.log(resetURL)

    const message = `FORGET YOUR PASSWORD ? SUBMIT A PATCH REQUEST WITH YOUR NEW PASSWORD AND PASSWORD CONFIRM TO:${resetURL}.\n if you dint forget your password ignore this email`


    // try catch is liye dala hai takay agr error aye tou catch mein jo token han unsab ki value undefine kr k delete krden

    try {
        await sendEmail({
            email:user.email,
            subject:'your password reset token valid for 10 minutes',
            message
        })
        
        res.status(200).json({
            status: 'success',
            message:'token sent to email'
    
        })
    } catch (error) {
        user.createPasswordResetToken = undefined;   
        user.createPasswordResetExpires = undefined;   
        // ye data modify krta save nahi is ye yahan save kia
        await user.save({ validateBeforeSave: false });

        return next(new AppError('there was a error sending the email.try again later '),500)
    }

  

});