const Tour = require('../model/tourModel');

exports.getAllTours = async (req, res) => {
    try{
         // 2) advance filtering 
      // query mein esay likhtay hn api/v1/tours?duration[gte]=5&difficulty=easy
      // agr greater than ya less than ka kaam krana ho url mein 
      let queryStr = JSON.stringify(queryObj); // stringify se object ko string mein convert kia hao 


      // to replace gte gt lte lt   inko agay dollar sign lagana hai
      // \b ka mtlb hai exact words match krega g se sab mein replace krega na k first mein
      // replace function accepts ka call back aur is ka pehla argument match string hai jo old string ko replace krdega
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`);
      // console.log(JSON.parse(queryStr));
      let query =  Tour.find(JSON.parse(queryStr));

       // execute the query
      const tours = await query;
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
  