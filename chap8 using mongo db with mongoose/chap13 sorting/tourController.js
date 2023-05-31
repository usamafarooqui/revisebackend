const Tour = require('../model/tourModel')

 exports.getAllTours = async (req, res) => {

    try{
        // Sorting the api by price in api we write (sort=price)
      if(req.query.sort){
        // query = query.sort(req.query.sort);
        

        // if sort by 2 criteria
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
        console.log(sortBy);
      }else{
        // if no sort define api sort results by created time
        // - means descending mein sort krega
        query = query.sort('-createdAt');
      }



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
    }catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
    }
  
  };