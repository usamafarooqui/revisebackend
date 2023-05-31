// npm i stripe YE secret key stripe k dash board se milegi
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
// import booking model
const Booking = require('../model/bookingModel');


exports.getCheckOutSession = catchAsync(async(req,res,next)=>{
    // 1) get the currently booked tour 
    const tour = await Tour.findById(req.params.tourID);

    // 2) create check out session
   const session = await stripe.checkout.sessions.create({
        payment_method_types : ['card'], // yani card se dega paisa
        // ye insecure rasta hai
        // yahan booking k liye query string bhejaingay q k yahan get request hai tou query string k ilawa kuch bhej bhi nahi saktay
        success_url : `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`, // yani jb transcation hojaye tou home pe ajaye 
        cancel_url : `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // cancel krde tou tour page pe ajaye
        customer_email : req.user.email,
        client_reference_id:req.params.tourId,
        line_items :[
        {
            // name desciption stripe ka options han inka name chanage nahi krsaktay
            name:`${tour.name} tour`,
            description: tour.summary,
            images : ['live image ka link ayega '],
            amount: tour.price *100 , // 100 se * is liye q k ye cents mein expect krta hai payment
            cuurency:'usd',
            quantity:1
        }
        ]
    })
    // 3) create session as Response 
    res.status(200).json({
        status:'success',
        session
    })
})


// yahan function bnao jahan se booking hogi 

exports.createBookingCheckOut = catchAsync(async ( req , res , next)=>{
    // this is only for temporary solution because its unsecure anyone can do booking without booking
    const {tour , user , price} = req.query;
    if ( !tour && !user && !price) return next();
    await Booking.create({tour , user , price})

    res.redirect(req.originalUrl.split('?')[0]);
})