const express = require('express');
const tourController = require('../controllers/tourController')
const router = express.Router();


// aliasing make a route for most search path 
//                                ye middleware hai iske ander logic lagay ga
router.route('/top-5-cheap').get(tourController.aliasTopTours ,tourController.getAllTours)


module.exports = router;