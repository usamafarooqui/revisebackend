const Tour = require('../model/tourModel');


// delete
  exports.deleteTour = async(req, res) => {
    
    try {
      await Tour.findByIdAndDelete(req.params.id)
      res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
    } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
    }
    
  };
