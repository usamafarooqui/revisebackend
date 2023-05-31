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
    // permission denay k liye ye field bnao
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
});