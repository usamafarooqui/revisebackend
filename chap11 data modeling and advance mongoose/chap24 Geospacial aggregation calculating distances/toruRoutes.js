


// path to calculate distances of tour from a certain points 
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances)  