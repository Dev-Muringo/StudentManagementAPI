const express=require('express');
const router=express.Router();

const upload=require('../middleware/uploadMiddleware');
const validateImageSignature = require('../middleware/validateImageSignature');
const validateStudentQuery=require ('../middleware/studentValidation');
const{getAllStudents,registerStudent} = require('../controllers/studentController');


router.get('/',validateStudentQuery,getAllStudents);
router.post('/',upload.single('profilePicture'),validateImageSignature,registerStudent);

module.exports=router;

