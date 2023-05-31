
const mongoose =require('mongoose');

const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
  
    name:{
      type:String,
      required:[true, 'A tour must have a name'],
      unique:true
    },
    slug:String,
    duration:{
      type:Number,
      require:[true,'A tour must have a duration']
    },
    maxGroupSize:{
      type:Number,
      require:[true,'A tour must have a group size']
    },
    difficulty:{
      type:String,
      require:[true,'A tour must have a difficulty']
    },
    ratingAverage:{
      type:Number,
      default:4.5
    }, 
     ratingQuantity:{
      type:Number,
      default:0
    }, 
    price:{
      type:Number,
      price:[true, 'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
      type:String,
      trim:true,
      required:[true , 'A tour must have a description']
    },
     description:{
      type:String,
      trim:true,
    },
     imageCover:{
      type:String,
      required:[true , 'A tour must have a cover image']
    },
    images:[String],
    createdAt:{
      type:Date,
      default:Date.now(),
      select:false
    },
    startDates:[Date],
    secretTour:{
      type:Boolean,
      default:false
    }
  },{
 
    toJSON:{virtuals:true},  
    toObject:{virtuals:true} 
  }
  
  );



  // aggregation middleware run on aggregation before or after
  // secret tour ko aggregate se bhi hide krna hai
  tourSchema.pre('aggregate',function(next){
    // to remove secret tour 
    // pipeline bhi array hai array k starting mein kuch dalnay k liye unshift use hota hai
    // match 1 stage hai jo humne start mein dal dia hai takay wo secrettours k ilawa baki sab ko pipeline mein jane de
    // this is going to point the current aggrete object
    this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
    console.log(this.pipeline()); // is se sare aggregate functions show hojayengay
    next();
  })





  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;