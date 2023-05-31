const express = require('express');
const bookingController = require('./bookingController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

// yahan rest principle follow nahi krengay bcz its not for creating deleting or updating 
// this route is only for client to get check out sessions 
router.use(authController.protect)


router.get('/checkout-session/:tourId', bookingController.createBookingCheckOut, bookingController.getCheckOutSession)

router.use(authController.restrictTo('admin','lead-guide'));

router.route('/').get(bookingController.getAllBooking).post(bookingController.createBooking)

router.route('/:id').get(bookingController.getBooking).patch(bookingController.updateBooking,bookingController.deleteBooking)


module.exports = router;
