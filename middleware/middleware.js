// Import the Express module
const express = require('express');

// create an event handler
const errorHandler = (err,req,res,next) => {
     const statusCode = res.statusCode ? res.statusCode : 500
     res.status(statusCode)
     res.json({
       message: err.message,
       stack: process.env.NODE_ENV === 'production'? null: err.stack
     })
   }
   
   // create an app instance
   const app = express()
   
   // use the errorHandler middleware
   app.use(errorHandler)
   
   // export the errorHandler function
   module.exports = {
     errorHandler,
   }

   