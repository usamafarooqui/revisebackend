const express = require('express');
const bookingController = require('./bookingController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');


// yahan rest principle follow nahi krengay bcz its not for creating deleting or updating 
// this route is only for client to get check out sessions 

Router.get('/checkout-session/:tourId', bookingController.createBookingCheckOut, authController.protect , bookingController.getCheckOutSession)


module.exports = router;
