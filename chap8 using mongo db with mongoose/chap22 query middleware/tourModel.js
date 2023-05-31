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


    // query middleware it runs before or after a certain query
  // query middleware mein find hota hai 
  // aur iska this document ki jaga query ko indicate krta hai 
  // lets make screte tour which are not shown to the public
  // /^find/ ye regular expression hai jo sare find walay mein ko select kr k un pe lagay ga
  tourSchema.pre(/^find/,function(next){
    // yahan this pe query k sare function lag saktay hn
    this.find({secretTour:{$ne:true}});
    // to calculate time of pre and post find middleware
    // this is a regular object so we can set any property on it
    this.start = Date.now();
    next();
  });


  // post query middleware
  // secret tour ko find se hide krdega 
  tourSchema.post('/^find/',function(docs,next){
    this.find({secretTour:{$ne:true}});
    console.log(`the query too ${Date.now() - this.start} milliseconds`);
    
    next();
  });


const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;
