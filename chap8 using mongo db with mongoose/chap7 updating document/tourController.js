const Tour = require('../model/tourModel');


  // update the tour 
  exports.updateTour = async (req, res) => {
   try {
    // req.params dhoonde ga req.body update krega new object new update document return krega
    const tour = await Tour.findByIdAndUpdate(req.params.id , req.body,{
      new:true, // yani updated document will be return 
      // runvalidators check krega k sare validations sahi lagain hn ya nahi
      runValidators:true
    } )
    res.status(200).json({
      status: 'success',
      data: {
        tour
      },
    });
   } catch (error) {
    res.status(404).json({
      status:'fail',
      message: error
    })
   }
    
  };
  