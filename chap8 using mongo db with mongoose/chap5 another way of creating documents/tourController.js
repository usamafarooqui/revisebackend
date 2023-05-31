const Tour = require('../model/tourModel');

 // sab se pehlay tour route bnatay hn
 exports.createTour = async (req, res) => {
    // jb async await use krtay hn tou uske ander try catch hota hai for error handling
    try{
       // doucment create krnay k do tareekay hn
    // const newTour = new Tour({})
    // newTour.save()
    // 2nd method
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data:{
        tour:newTour
      }
    
    });
    }catch (err){
      res.status(400).json({
        status:'fail',
        message: err
      })
    }
   
  };