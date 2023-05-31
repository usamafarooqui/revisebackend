


 // how to retrive data from current logged in user 
 // ye 1 middleware hai jo logged in user ka data return krega

  exports.getMe = (req,res,next)=>{
    // ye id jb huum iska route bnayegay tou wahan se protect lagayengay us se ye req.user.id mil jayega
    req.params.id = req.user.id;
    next();
  }
