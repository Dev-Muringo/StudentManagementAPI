const express=require('express');
const router=express.Router();

const upload=require('../middleware/uploadMiddleware');
const validateImageSignature = require('../middleware/validateImageSignature');
const validateStudentQuery=require ('../middleware/studentValidation');
const{getAllStudents,registerStudent,loginStudent} = require('../controllers/studentController');


router.get('/',validateStudentQuery,getAllStudents);
router.post('/',upload.single('profilePicture'),validateImageSignature,registerStudent);
router.post('/login',loginStudent);
module.exports=router;

