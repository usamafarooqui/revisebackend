// install npm i helmet

const helmet = require('helmet');

// securing http headers
app.use(helmet());

// reading data from the body req.body
// we can also limit body 
app.use(express.json({limit:'10kb'}));