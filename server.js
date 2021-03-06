const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');

// load env variable
dotenv.config({ path: './config/config.env' });

// connect to the database
connectDB();

// route files
const bootcamps = require('./routes/bootcamps');


//middleware
const logger = require('./middleware/logger')

const app = express();

// Body Parser
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps);

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.bgRed);
    //close server and exit process
    server.close(() => process.exit(1))
})