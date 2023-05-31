const express = require('express');
const tourController = require('../controllers/tourController')
const router = express.Router();




// pipeline wala route
router.route('/tour-stats').get(tourController.getTourStat);





module.exports = router;