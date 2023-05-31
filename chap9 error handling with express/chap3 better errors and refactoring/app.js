const express = require('express');
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes');
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// to serve static files 
app.use(express.static(`${__dirname}/public`))


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users' , userRouter);



app.all('*',(req, res , next)=>{
  // res.status(404).json({
  //   status:'fail',
  //   message:`cant find ${req.originalUrl} on this server!!!`
  // })

  // new error handling
  // next mein koi parameter do tou wo by default error hota hai aur global error class tk le k jataa hai
  // next(`cant find ${req.originalUrl} on this server!!!`,404);
  // calling global error class here
  next(new AppError(`cant find ${req.originalUrl} on this server!!!`,404));
});


// make a global error handling middleware 
// agr app.use mein ye 4 parameter dal dogay tou wo automatically error handling middleware bn jayega 
// jo yahan handler tha usko errorController bna k wahan likh dia aur yahan bus uska naam call krdia
app.use(globalErrorHandler);


module.exports =app;



