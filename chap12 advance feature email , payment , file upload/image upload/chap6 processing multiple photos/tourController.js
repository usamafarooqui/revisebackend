// user controller mein bhi async await lagana hai resize k function pe


exports.resizeTourImages =catchAsync(async (req, res, next) => {
  console.log(req.files);
  if(req.files.imageCover || req.files.images) return next();

  // image cover
  // req.body is liye k ye sab kuch update krega 
  req.body.imageCover = `tour-/${req.params.id}-${Date.now()}-cover.jpeg`
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/req.body.imageCover`);

  // images 
  req.body.images = [];
  await Promise.all( // ye map chalay ga tou next bhi sath chalay ga aur  req.body.images = []; value save nahi hogi is liye isko yehi promise all kr k ruk dia hai takay hr dafa chalnay k sath ye pehlay push kre phr next() pe jaye
    //                          file callback ka variable hai aur i index call back mein automatically index milta
    req.files.images.map(async (files,i)=>{
      const filename = `tour-/${req.params.id}-${Date.now()}-${i+1}.jpeg`
      await sharp(files.buffer)
      .resize(2000, 1300)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/req.body.imageCover`);

      req.body.images.push(filename)
  
    })
  )
  next();
});