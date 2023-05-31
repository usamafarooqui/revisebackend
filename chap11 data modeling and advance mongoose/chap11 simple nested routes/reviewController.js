

// create a review 

exports.createReview= catchAsync( async(req,res,next)=>{
    // if body se data na araha ho
    if(!req.body.tour) req.body.tour=req.params.tourId;
    //                               req.user login user se milega 
    if(!req.body.user) req.body.user=req.user.id;
    const newReview = await Review.create(req.body);

    res.status(200).json({
        status:'success',
        data:{
            review:newReview
        }
    })
});

