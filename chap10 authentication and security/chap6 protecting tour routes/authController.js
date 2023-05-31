const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

// to use promiify from express built in libarary
const {promisify} = require('util')

// protecting getalltours route

exports.protect = catchAsync( async (req, res, next)=>{
    // 1) getting token and check if its there

    let token;

    // jwt mein token header bhejnay ka standard tareeka hota hai 
    // header mein authorization ayega aur uski value mein start mein Bearer 
    // ab usko check krnay k liye 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // Bearer hsjahjashj bearer k bad wali value ko get krnay k liye 
        token = req.headers.authorization.split(' ')[1];
    }

    // agr token na mile tou
    if(!token){
        return next(new AppError('You are not logged in please log in to access',401))
    }
    // 2) verification of the token 

    // jwt khud hi verify krleta hai jwt.verify k zariye
    // ye 1 promise return krta hai is liye promisify promisify isko as aync await use kr saktay hn
    // agr promisfy nahi krtay tou call back lagana parta 
    // uper se promsify ko import bhi kro
    const decode = await promisify(jwt.verify)(token , process.env.JWT_SECRET);
    // console.log(decode);


    // 3) check if user still exists 
    // yani kbhi token bnaya ho uske bad us user ko delete hojaye tou token bhi khatm hojana chaiye
    const currentUser = await User.findById(decode.id);
    if (!currentUser){
        return next(new AppError('the user belonging to this token does not exist', 401));
    }


    // 4) check if user changed password after the token was issued 
    // jb bhi token bnta hai iat yani issued at assigned hojata hai
    // changedPasswordAfter ye instance method se aya hai
   if( currentUser.changedPasswordAfter(decode.iat)){
    return next(new AppError('user change passoword please log in again',401));
   }
    

    // lets put entire user data on request(for future)
    //req object travel from middleware to middleware (pass data between 2 middleware)
    req.user = currentUser;
    next();
});