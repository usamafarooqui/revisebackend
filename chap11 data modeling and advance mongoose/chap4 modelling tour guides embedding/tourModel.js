// is mein dekhaingay embedding kesay krengay User k data mein se guides nikal k yahan embedd krenagy

const mongoose = require("mongoose");
const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    
     // embedding
    guides:Array,



  }
);



// user model embadding here
tourSchema.pre('save', async function(next){
  // map jb chala ga tou sare promise ajayengay guidesPromises unko handle krnay k liye Promise.all kia hai ye sab promise ko 1 sath run krega aur khali data return krega
  
  const guidesPromises = this.guides.map(async id => await User.findById(id));
  this.guides = await Promise.all(guidesPromises);
  next();
})

