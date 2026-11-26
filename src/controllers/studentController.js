const fs=require('fs');
 const {getAllStudents:getAllStudentsService,
        registerStudent:registerStudentService,
        loginStudent:loginStudentService
    } =
     require('../services/studentService');

 async function getAllStudents(req,res){
    try{
   const {page,limit}=req.pagination;
const { course, yearOfStudy } = req.filters;
const offset = (page - 1) * limit;
const students=await getAllStudentsService(limit,offset,course,yearOfStudy);
res.status(200).json({
    success:true,
    message:"Students retrieved successfully",
    data:students
})}catch(error){
    res.status(500).json({
        success:false,
        message:"An error occurred while retrieving students",
        error:{
            code:"INTERNAL_SERVER_ERROR"
        }
    })
}
}
 async function registerStudent(req,res){
    try{
       const profilePicture = req.file?.path; 
   const imageUrl = profilePicture
    ? `http://localhost:3000/${profilePicture.replace(/\\/g, "/")}`
    : null;
    const student= await registerStudentService({
        ...req.body,
        yearOfStudy:Number(req.body.yearOfStudy),
        profilePicture:imageUrl
    });
   
    res.status(201).json({
    success:true,
    message: "Student registered successfully",
    data: student
})
    }catch(error){
    
    if(req.file?.path){
        try{
            await fs.promises.unlink(req.file.path);
        }catch(cleanupError){
            console.error("Failed to delete uploaded image:",cleanupError);
        }
    }
        res.status(400).json({
            success:false,
            message:error.message,
            error:{
                code:"VALIDATION_ERROR"
            }
        })
    }
 }

 //student login
 async function loginStudent(req,res){
    try{
        const {studentId,password}=req.body
    
    const student=await loginStudentService(
        studentId,password
    );
    return res.status(200).json({
        success:true,
        message:"Login successful",
        data:student
    });
    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        });
    }
 }
 module.exports={getAllStudents,registerStudent,loginStudent};