const express=require('express');
const router=express.Router();
const{getAllStudents,registerStudent} = require('../controllers/studentController');


router.get('/',getAllStudents);
router.post('/',registerStudent)

module.exports=router;