const express=require('express');
const app=express();

const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler=require('./middleware/errorHandler');
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use(loggerMiddleware);
app.use('/students', studentRoutes);


// Central error-handling middleware
app.use(errorHandler);
app.use('/uploads',express.static('uploads'));







module.exports=app;