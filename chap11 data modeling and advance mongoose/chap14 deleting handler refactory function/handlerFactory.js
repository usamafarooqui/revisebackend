const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');

// factory function wo hotay hn jo dusra function return kren
// ye delete sab mein kaam ajayega user tour review 
// is ke under bus model ka parameter pass krdo 



exports.deleteOne = Model =>catchAsync(async (req, res , next) => {
  
    const doc =  await Model.findByIdAndDelete(req.params.id);
     
     if(!doc){
       return next(new AppError('No document found with that id',404) );
     }
     res.status(204).json({
       status: 'success',
       data: {
         tour: null,
       },
     });
   
 });


// isko call krnay ka tareeka 
// isko import kro 
const factory = require('./handlerFactory');

// then 
exports.deleteTour = factory.deleteOne(Tour);
