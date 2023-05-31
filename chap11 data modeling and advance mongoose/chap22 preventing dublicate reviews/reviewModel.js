// model k bad ye line 

// preventing duplicate reviews by indexing
// tour , user mein 1 ya -1 daldo us se farq nahi parta but akhir k unique true se ye kaam krega
// unique ab tour bhi 1 hoga user bhi 1 
reviewSchema.index({tour:1,user:1},{unique:true})


//=========================in tour model ==================================

// iska dublicate review se koi talluq nahi ye bus average rating ko 4.66666666666666666 se 4.7 krdega

// ratingsAverage: {
//       type: Number,
//       default: 4.5,
//       // max min on numbers 
//       max:[5,'Rating must be below 5.0'],
//       min:[1,'Rating must be above 1.0'],
//       // to round off the value
//       // set is a setter function
//       set:val=>Math.round(val*10)/10
//     },