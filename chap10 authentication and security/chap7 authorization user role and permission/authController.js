


//yahan permission denay ka function bnao

// middle ware mein parameter nahi de saktay is liye 1 function bnaye gay then us mein middleware function bnayegay 

exports.restrictTo = (...roles) =>{
    // yahan ab middleware function bnayegay us mein hum roles access kr saktay hn
    return (req, res , next) =>{
        // uper req.user mein pura user object hai wahan se role nikal jayega login user ka
        // roles is an array ['admin','lead-guide']
        if(!roles.includes(req.user.role)){
            return next(new AppError('You dont have permission to access this route',403))
        }

        next();
    }
}