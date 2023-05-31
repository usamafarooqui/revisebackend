


// populate the fields by referencing 

reviewSchema.pre(/^find/,function(next){
    // populate krnay k liye this.populate and 2 field ko populate krna ho tou 2 dafa populate use krtay hn
    this.populate({
        path:'tour',
        select:'name'
    }).populate({
        path:'user',
        select:'name photo'
    })

     
    
    next();
})