

 // yahan wo middleware bnao

 exports.checkBody = (req, res , next)=>{
  if (!req.body.name || !req.body.price) {
      // return lazmi lagana warna header error ayega
     return  res.status(400).json({
        status: 'fail',
        message: 'missing name or price',
      });
    }
    next();
}

 