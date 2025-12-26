const express = require('express');
const app = express();

//middleware to parse JSON bodies
app.use(express.json());
// Internal note: This middleware automatically handles parsing JSON request bodies and attaching the parsed object to req.body.

// Internal working of express.json():

// (req, res, next) => {
//   if (Content-Type is application/json) {
//     read request body
//     parse JSON
//     attach result to req.body
//   }
//   next();
// }


//Routes
const healthCheckRoute = require('./routes/health.routes');
app.use('/health', healthCheckRoute); // health 

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes); // authentication routes

const protectedRoutes = require("./routes/protected.routes");
app.use("/protected", protectedRoutes);



module.exports = app;