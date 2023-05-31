


exports.getAllReviews= catchAsync( async(req,res,next)=>{
    // agr tourId bhi ho tou bus us tour k tamam reviews nikalaingay 
    let filter = {};
    // agr req.params mein tourId ho tou 
    if(req.params.tourId) filter ={tour:req.params.tourId};
    
    const reviews = await Review.find(filter);

    res.status(200).json({
        status:'success',
        result:reviews.length,
        data:{
            reviews
        }
    })
});