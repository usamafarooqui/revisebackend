const Tour = require('../model/tourModel')
const ApiFeatures = require('../utils/apiFeatures')


  exports.aliasTopTours = (req,res , next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
  }

 
  exports.getAllTours = async (req, res) => {
   
    
    try {
     
      // execute the query

      // feauture function ka filter method yahan call hoga
      const features = new ApiFeatures(Tour.find(), req.query).filter().limitFields().paginate().sort();
      // const tours = await query; query ki jaga
      const tours = await features.query;
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
  
 