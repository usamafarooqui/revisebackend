// npm i express-mongo-sanitize and npm i xss-clean

const mongoSanitize = require('express-mongo-sanitize');

// data sanitization against nosql query injection
app.use(mongoSanitize());

// data sanitization against malicious html
app.use(xss())