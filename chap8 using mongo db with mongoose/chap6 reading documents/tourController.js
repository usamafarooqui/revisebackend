const Tour = require('../model/tourModel');

  // 2nd ab ye wali api (reading the documents)
  exports.getAllTours = async (req, res) => {
    try {
      // jb find mein kuch bhi data pass na ho tou wo sare document retrun krta hao
      const tours = await Tour.find();
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
    }
  
  };
  

   // read a specific tour by id
   exports.getTour = async(req, res) => {
    try {
     // req.params.id is liye q k url mein variable ka naam id hai
     console.log(req.params.id)
     // findbyid is like findOne({_id:req.params.id})
     const tour =await Tour.findById(req.params.id);
     console.log(tour.status);
     res.status(200).json({
       status: 'success',
       data: {
         tour,
       },
     });
    } catch (error) {
     res.status(404).json({
       status:'fail',
       message: error
     })
    }
    
   };