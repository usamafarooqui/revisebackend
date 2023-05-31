const Tour = require('../model/tourModel')



  exports.aliasTopTours = (req,res , next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
  }
  
  exports.getAllTours = async (req, res) => {}