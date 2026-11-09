const express=require('express');
const router=express.Router();
const validateStudentQuery=require ('../middleware/studentValidation')
const{getAllStudents,registerStudent} = require('../controllers/studentController');


router.get('/',validateStudentQuery,getAllStudents);
router.post('/',registerStudent)

module.exports=router;