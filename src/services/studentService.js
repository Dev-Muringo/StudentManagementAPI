 async function getAllStudents(limit,offset,course,yearOfStudy){
   
  return [];
    
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
   const phoneRegex=/^(?:\+254|0)(?:7|1)\d{8}$/;

   if(!phoneRegex.test(student.phoneNumber)){
      throw new Error("Please provide a valid Kenyan phone number");
    
   }
}
return student;
     } ;
 

module.exports={getAllStudents,registerStudent};