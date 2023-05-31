const Booking = require('model/bookingModel')


exports.getMyTours= catchAsync(async (req,res,next)=>{
    // 1) find all bookings 
    const bookings = await Booking.find({user:req.user.id});

    // 2) find tours with the returned ids 
    const tourIDs = bookings.map(el => el.tour);
    const tours = await Tour.find({_id:{$in:tourIDs}})

    res.status(200).render('overview')
})