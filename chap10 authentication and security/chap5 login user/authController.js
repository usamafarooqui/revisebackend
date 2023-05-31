const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// for jsonwebtoken
const jwt = require('jsonwebtoken'); // npm i jsonwebtoken



// to login user

exports.login= catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;

    // 1) if email and password exists 
    if(!email || !password){
       return  next(new AppError('please provide email and passowrd',400));
    }

    // 2) check if users exists and password is correct 
    // .select('+password'); is isliye kia hai q k model mein passowrd visiblity off krdi hai aur yahan passeord
    // match kranay k liye isko unselect krna prega uske liye .select('+password');
    // user ko uski id se dhoonda hai
    const user = await User.findOne({email}).select('+password');

    // lets match user and password ye password match krnay k liye go to user mOdel
    // instance method tamam user document (user) per avalaible hoga
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('incorrect email or password',401));
    }

    // 3) if everything is ok send token to client 
    const token = signToken(user._id);
    
    res.status(200).json({
        status:'success',
        token
        
    })

});