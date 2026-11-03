const express=require('express');
const app=express();

const loggerMiddleware = require('./middleware/loggerMiddleware');
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use(loggerMiddleware);
app.use('/students', studentRoutes);







module.exports=app;