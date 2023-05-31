const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'A user must have a email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please provide valid email address']
    },
    photo:String,
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm your password'],
        // adding a validation to confirm passwords
        validate:{
            // this only works on save and create 
            validator:function(el){
                return el === this.password;
            },
            message:'passwords are not the same'
        }
    },
    // ye bus password change honay pe apply hogi
    passwordChangedAt:Date,
});



// change password function (user has change its password after the token was issued)
// ye bhi 1 instance method hoga
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    // agr kabhi password change hua ho
    if(this.passwordChangedAt){
        // dono time stamp alag format mein hn passwordchangeAt ko second mein krnay k liye
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000 , 10) // 10 yani base 10 number hai
        // console.log(this.passwordChangedAt , JWTTimestamp);
        // iske true honay ka mtlb password change hua hai
        return JWTTimestamp < changedTimestamp;
    }
    // by default ye value false hogi yani not change
    return false;
}




const User = mongoose.model('User',userSchema);

module.exports = User;