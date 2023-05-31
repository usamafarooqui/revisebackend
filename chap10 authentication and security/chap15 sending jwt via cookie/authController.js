

// send token a 1 refactory function

const createSendToken = (user , statusCode , res)=>{
    const token = signToken(user._id);
    const cookieOptions={
        expires:new Date(Date.now() + process.env.JWT_COOKIES_EXPIRES_IN *24*60*60*1000),
        // secure:true, ye part production mein on kro
        httpOnly:true // iska mtlb browser isko access aur modify nahi kr sakta
    };

    if(process.env.NODE_ENV === 'production') cookieOptions.secure =true;
      // HOW TO SEND A COOKIE
      //         cookie name , cookie data , more options
      res.cookie('jwt',token,cookieOptions)

          // to hide password
      user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }

    })
}