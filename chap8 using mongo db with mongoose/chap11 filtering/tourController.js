const Tour = require('../model/tourModel')

exports.getAllTours = async (req, res) => {
    // yahan query string bnaegay
    // url se query string nikalnay k liye req.query
    // console.log(req.query)
    
    try {
      // Build Query
      // to delete unwanted fields from the query 
      // ye {...req.query} is liye use kia hai q k queryObj ko iske = rakh dia hao
      // ab query object mein change ka mtlb req.body mein change is cheez ko avoid krnay k liye
      const queryObj ={...req.query};
      // ye cheezain query se nikal jayengi
      const excludeFields = ['page','sort','limit','fields'];
      // delete is a operator here
      excludeFields.forEach(el => delete queryObj[el])
      // there are 2 methods to find
      // const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')


      //  const query = await Tour.find() yahan ye use nahi krsaktay q k await laga dia tou initial query ready hojayegi
      //  aur baki methods chain nahi kr payegay is liye 1)       const query =  Tour.find(queryObj); 2)   const tours = await query;

      const query =  Tour.find(queryObj);

  
      // execute the query
      const tours = await query;

      // send response
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