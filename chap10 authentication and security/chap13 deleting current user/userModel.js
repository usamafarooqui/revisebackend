// active naam ki field bnao 
// basically delete nahi krengay
// us acccount ko unactive krengay

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  
    active:{
        type:Boolean,
        default:true,
        select:false
    }

});


// delete wali query k liye khali wo user send krengay jinka active status true hon
// /^find/ iska mtlb sari find queries
userSchema.pre(/^find/,function(next){
    // this points to the current query
    this.find({active:{$ne:false}});
    next();
})