const express=require('express');
const router=express.Router();
const getAllStudents = require('../controllers/studentController');
const { get } = require('../app');

router.get('/',getAllStudents);

module.exports=router;