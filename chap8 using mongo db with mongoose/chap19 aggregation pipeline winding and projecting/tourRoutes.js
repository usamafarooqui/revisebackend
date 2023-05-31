const express = require('express');
const tourController = require('../controllers/tourController')
const router = express.Router();



// business problem konsay month mein sab se ziada log tour select krtay hn
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);





module.exports = router;