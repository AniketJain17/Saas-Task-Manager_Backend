const express = require('express');
const app = express();

//middleware to parse JSON bodies
app.use(express.json());


//Routes
const healthCheckRoute = require('./routes/health.routes');
app.use('/health', healthCheckRoute);

module.exports = app;