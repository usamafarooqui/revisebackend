const express = require('express');
const fs = require('fs');
// require the third party middleware morgan
const morgan = require('morgan'); // npm i morgan

const app = express();


// all middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

// agr time bhejna ho tou res mein

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});