
 const {getAllStudents:getAllStudentsService,
    registerStudent:registerStudentService} =
     require('../services/studentService');

 async function getAllStudents(req,res){
 const students=await getAllStudentsService();
 res.send(students);
 }
 async function registerStudent(req,res){
    try{
    const student= await registerStudentService(req.body);
    res.status(201).json({
    message: "Student registered successfully",
    data: student
});
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
 }
 module.exports={getAllStudents,registerStudent};