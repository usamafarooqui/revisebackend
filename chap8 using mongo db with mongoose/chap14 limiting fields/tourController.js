const Tour = require('../model/tourModel')

 exports.getAllTours = async (req, res) => {

    try{
        // 3) fields limiting 
      // yani user ko data request kre usko wohi data send kia jaye
      if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        // select method hai k bus yehi data send kia jayega
        query = query.select(fields);
      }else{
        // __v mongo by default bhejta hai - ka mtlb ye send nahi hoga
        // note agr chahain tou model se bhi bhi field ko unselect kr saktay hn 
        // for eg 
        // createdAt:{
        //     type:Date,
        //     default:Date.now(),
        //     // iska mtlb ye data api mein send nahi hoga
        //     select:false
        //   },
        query = query.select('-__v');
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