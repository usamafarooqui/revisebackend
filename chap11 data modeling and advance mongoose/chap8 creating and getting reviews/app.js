// call router 
const reviewRouter = require('./routes/reviewRoutes');

// review ka route bnap
app.use('/api/v1/reviews' , reviewRouter);
