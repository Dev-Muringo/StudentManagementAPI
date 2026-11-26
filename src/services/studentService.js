 const studentDAO=require('../dao/StudentDAO');
 const { hashPassword,verifyPassword } = require('../utils/password');



 //GET ALL STUDENTS
 async function getAllStudents(limit,offset,course,yearOfStudy){
   const students=await studentDAO.getAllStudents();
  return students;
    
}
//GET STUDENT BY ID
async function getStudentById(studentId){
   const student=await studentDAO.getStudentById(studentId);
   return student;
}

//UPDATE student
async function updateStudent(studentId){
   const student =await studentDAO.updateStudent(studentId,firstName);
   return student;
}

//DELETE STUDENT
async function deleteStudent(studentId){
   const student =await studentDAO.deleteStudent(studentId);
   return student;
}

 async function registerStudent(student){
   if (!student || typeof student !== "object" || Array.isArray(student)) {
    throw new Error("Invalid student data");
}
//validate first name
if(!student.firstName || student.firstName.trim()===""){
   throw new Error("First name is required");

}
//validate last name
if(!student.lastName|| student.lastName.trim()===""){
   throw new Error("Last name is required");

}
//validate email
if(!student.email ||student.email.trim()===""){
throw new Error ("Email is required");

}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)){
   throw new Error("Please provide valid email address")
}
  //validate year of study
  if(!Number.isInteger(student.yearOfStudy)||
student.yearOfStudy < 1 ||
student.yearOfStudy > 4){
   throw new Error ("Year of study must be between 1 and 4")
}
//validate phone no
if(student.phoneNumber){
   const phoneRegex= /^(?:\+254|0)(?:7|1)\d{8}$/;

   if(!phoneRegex.test(student.phoneNumber)){
      throw new Error("Please provide a valid Kenyan phone number");
    
   }
}

// VALIDATE PASSWORD
if (!student.password || student.password.trim() === "") {
    throw new Error("Password is required");
}

if (student.password.length < 8) {
    throw new Error("Password must contain at least 8 characters");
}

const passwordHash = await hashPassword(student.password);

return await studentDAO.createStudent(
   student.firstName,
   student.lastName,
   student.email,
   student.yearOfStudy,
   student.phoneNumber || null,
   passwordHash,
   student.profilePicture ||null
);
     } ;

     //student login
     async function loginStudent(studentId,password){
      //find student using id
      const student=await studentDAO.getStudentForLogin(studentId);
      //check whether student exists
      if(!student){
         throw new Error ("Invalid student ID or password");

      }
      //verify submitted password against stoored hash
      const passwordMatches=await verifyPassword(
         student.password_hash,
         password
      );

      if(!passwordMatches){
         throw new Error("Invalid student ID or password")
      };

      return{
         student_id:student.student_id,
         first_name:student.first_name,
         last_name:student.last_name
      }
     }
 

module.exports={getAllStudents,registerStudent,loginStudent,getStudentById,updateStudent,deleteStudent};