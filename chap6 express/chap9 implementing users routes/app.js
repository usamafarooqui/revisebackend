const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);





// users route 

const getAllUsers= ( req , res) =>{
  res.status(500).json({
    status:'error',
    message:'this route is not yet define'
  })
}

const createUser= ( req , res) =>{
  res.status(500).json({
    status:'error',
    message:'this route is not yet define'
  })
}

const getUser = ( req , res) =>{
  res.status(500).json({
    status:'error',
    message:'this route is not yet define'
  })
}

const updateUser= ( req , res) =>{
  res.status(500).json({
    status:'error',
    message:'this route is not yet define'
  })
}

const deleteUser = ( req , res) =>{
  res.status(500).json({
    status:'error',
    message:'this route is not yet define'
  })
}



app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);


const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
