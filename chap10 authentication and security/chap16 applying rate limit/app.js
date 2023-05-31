// install npm express-rate-limit

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max:100, // max request per api
  windowMs:60*60*1000, // 1 hour 
  message:'to many request from this ip please try again later in an hour'
});

// jo bhi route /api se start hongay sab pe apply hojkayega
app.use('/api', limiter);