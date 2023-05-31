const Tour = require('../model/tourModel')



  // fix business logic k konsay month mein sab se ziada tour hotay hn

  exports.getMonthlyPlan =async (req,res)=>{
    try {
      const year = req.params.year *1;
      const plan = await Tour.aggregate([
        {
          // deconstruct array fields from input documents and output 1 document from each of the array
          $unwind:'$startDates'
        },
        {
          // bus 1 saal k tour nikalnay k liye
          // match is used for select documents
          $match:{
            startDates:{
              $gte: new Date(`${year}-01-01`), // jan-01-2021 se bara
              $lte: new Date(`${year}-12-31`) // dec-31-2022 se chota se bara
            }
          }
         },{
          $group:{
            // $month date mein se month extract krlega khud
            _id:{$month:'$startDates'},
            // how to count tours in months
            numTourStarts:{$sum:1},
            // 1 array bna dega push aur $name is the field in the database is mein jo tour us month mein huay hn unke naam dal dega
            tours:{$push:'$name'}
          }
         },{
            // month ki field add krega
          $addFields:{month:'$_id'}
         },{
          $project:{
                // id 0 yani id kp remove krdega
                _id:0
              }
         },{
          // month ko highest tour k hisab se sort krengay
          // -1 yani descending
          $sort:{numTourStarts:-1}
         },{
          // k kitnay result show hongay only for reference
          $limit:12
         }
      
        
      ]);

      res.status(200).json({
        status: 'success',
        size:plan.length,
        data: {
          plan
        },
      });

    } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
    }
  }



    