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
        // select ko off krnay se ye kahin bhi output mein nahi jayega
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
    }
});



// yahan instance function bnayegay jo password compare krengay 
// instance function wo hotay hn jo har document k liye available hon on a certain collection
// correctPassword function ka naam hai
userSchema.methods.correctPassword = async function(candiatePassword , userPassword){
    // this keyword points to current document 
    // but q k password off krdia hai is liye this.password is not available is liye user password liya warna bus caniate password letau
    
    return await bcrypt.compare(candiatePassword, userPassword);
};

const User = mongoose.model('User',userSchema);

module.exports = User;