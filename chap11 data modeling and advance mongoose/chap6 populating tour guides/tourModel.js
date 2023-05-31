// populate ka function do jaga chaiye is se liye duplicate code se bachnay k liye hum iska query middleware bna dengay


// model k neechay ye bnana 

// guides field ko populate krnay k liye middleware

tourSchema.pre(/^find/,function(next){
    // is mein this always points to the current query
    this.populate({
      path:'guides', // isko populate krengay
      select:'-__v -passwordChangedAt' // ye cheez api mein nahi jayegi
    });
  
    next();
  })