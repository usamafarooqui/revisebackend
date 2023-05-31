// to remove dublicate parameter in the query string

const hpp = require('hpp');

// whitelist se wo sare duplicate ho saken gay
app.use(hpp({
  whitelist:['duration','ratingsQuantity','ratingsAverage','difficulty','price','maxGroupSize']
}));

