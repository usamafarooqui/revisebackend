const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide valid email address']
    },
    photo: String,

    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'admin',
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        // adding a validation to confirm passwords
        validate: {
            // this only works on save and create 
            validator: function (el) {
                return el === this.password;
            },
            message: 'passwords are not the same'
        }
    },
    // ye bus password change honay pe apply hogi
    passwordChangedAt: Date,
    //password reset token aur password expires ki field bnao
    passwordResetToken: String,
    passwordResetExpires: Date,

});


// password reset function
const crypto = require('crypto');

userSchema.methods.createPasswordResetToken = function(){
    // password ki tarah resettoken bhi kabhi plain database mein nahi jani chaiye is liye 
    // node k built in module se encrypt krdia hai
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // token ka expire function bnao
    this.passwordResetExpires = Date.now() + 10*60*1000; // iska mtlb 10 min hongay password reset krnay k liye
    console.log({resetToken}, this.passwordResetToken);

    // return is liye takay is ki value use krsaken 
    return resetToken;

}



const User = mongoose.model('User', userSchema);

module.exports = User;