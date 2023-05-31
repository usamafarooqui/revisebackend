const sendErrorDev =(err,res)=>{
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
    error:err,
    stack:err.stack
  })
}

const sendErrorProd =(err,res)=>{
  // agr operational error hoga tou ye
  // operational error trusted error send message to the client 
  if(err.isOperational){
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message,
    })
    // programming or other unknown error dont leak details to the client
  }else{
    // also log the error 
    console.error('error',err)
    // send generic message to the client
    res.status(500).json({
      status:'error',
      message:'something went very wrong',
    })
  }
 
}


module.exports= (err, req, res, next)=>{
    // to know status code 
    // agr status code aya tou theek warna 500 bhej dega
    err.statusCode = err.statusCode || 500;
    // to know status 
    err.status = err.status || 'error';
  
    

    if(process.env.NODE_ENV === 'development'){
      sendErrorDev(err,res)
    }else if(process.env.NODE_ENV === 'production'){
      sendErrorProd(err,res)
    }
    
  }