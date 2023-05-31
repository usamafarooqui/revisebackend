const mongoose =require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})


// uncaught exception 
process.on('uncaughtException',err =>{
  console.log(err.name , err.message);
  process.exit(1);
  
});

const app = require('./app');

// CONNECT MONGODB
const DB = process.env.DATABASE;
mongoose.connect(DB,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
}).then(()=> {
    console.log('conncection successful')
});



const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});


// to handle unhandled routes
// ye 1 event emit krega jisko catch krengay process.on k zariye then usko handle krengay
// ye global error handler bn gaya hai ap puri application mein ye kaam asakata hao
process.on('unhandledRejection',err =>{
  console.log('shutting down the server')
  console.log(err.name , err.message);
  // jb esa error ajaye tou application ko shut down krdo
  // pehlaay server close kro
  server.close(()=>{
    process.exit(1);

  })
});


// // uncaught exception 

// process.on('uncaughtException',err =>{
//   console.log('shutting down the server')
//   console.log(err.name , err.message);
//   // jb esa error ajaye tou application ko shut down krdo
//   // pehlaay server close kro
//   server.close(()=>{
//     process.exit(1);

//   })
// });