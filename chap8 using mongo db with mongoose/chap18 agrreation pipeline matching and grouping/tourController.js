const Tour = require('../model/tourModel')



  // aggregate  pipleine controller here

  exports.getTourStat = async(req, res)=>{
    try {
        // array k ander sare wo methods hongay jo humain implement krnay hn
        // Tour humara model hai aur aggregate function
        const stats = await Tour.aggregate([
          {
            // match is to select or filter certain objects this is primary stage to prpare for the next stage
            $match:{ ratingAverage:{$gte:4.5}}
          },
          {
            // allows to group documents together using accumalotors(to calculate airthematic logics)
            $group:{
              // id se group by krtay hn agr id null hogi tou sab 1 group mein hongay
              // _id:null,
              // agr kisi aur field se group krna hai tou
              // _id:'$difficulty',
              // to convert this in uppercase 
              _id:{$toUpper:'$difficulty'},
              // _id:'$ratingAverage',
              // avgRating is a new field $avg is a mongodb operator is to calculate average $ratingAverage k iska average calculate krna hai
              numTours:{$sum:1},
              numRatings:{$sum:'$ratingQuantity'},
              avgRating:{$avg :'$ratingAverage'},
              avgPrice:{$avg:'$price'},
              maxPrice:{$max:'$price'},
              minPrice:{$min:'$price'}
            }
          },
            {
              // 1 yani assceding
              // avgPrice use krna hai instead of price q k pipeline mein ab uske variables available hongay 
              $sort:{avgPrice:1}
            },
          //    {
          //   // Id mein ab difficulty save hai aur ne yani not equal wo fileds dega jiski difficulty easy nahi hai
          //   $match:{ _id:{$ne:'EASY'}}
          // }
        ]);

        res.status(200).json({
          status: 'success',
          data: {
            stats
          },
        });

        // routes mein ja k tour route mein iska route bnao
    } catch (error) {
      res.status(404).json({
        status:'fail',
        message: error
      })
    }
  };


