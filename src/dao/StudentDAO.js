const pool=require('../config/db');

//Read
const getAllStudents = async () => {
    const result = await pool.query(
        `SELECT student_id, first_name, last_name, email,
                year_of_study, phone_number, profile_picture
         FROM students`
    );

    return result.rows;
};


//read student by id
async function getStudentById(studentId) {
    const result = await pool.query(
        `SELECT student_id, first_name, last_name, email,
                year_of_study, phone_number, profile_picture
         FROM students
         WHERE student_id = $1`,
        [studentId]
    );

    return result.rows[0];
}

//for login
async function getStudentForLogin(studentId){
    const result=await pool.query(
        `SELECT student_id,first_name,last_name,password_hash
        FROM students
        WHERE student_id=$1`,
        [studentId]
    );
    return result.rows[0];
}

//CREATE
async function createStudent(firstName,lastName,email,yearOfStudy,phoneNumber,passwordHash,profilePicture){
    const result=await pool.query(
       ` INSERT INTO  students(first_name,last_name,email,year_of_study,phone_number,password_hash,profile_picture)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING student_id, first_name, last_name, email,
          year_of_study, phone_number, profile_picture`,
        [firstName,lastName,email,yearOfStudy,phoneNumber,passwordHash,profilePicture]
        );

      return result.rows[0];
    
}

//UPDATE
async function updateStudent(studentId,firstName){
    const result=await pool.query(
        `UPDATE students 
        SET first_name=$1
        WHERE student_id=$2
        RETURNING student_id, first_name, last_name, email,
          year_of_study, phone_number, profile_picture`,
        [firstName,studentId]
         );
        return result.rows[0];



    }
    //DELETE
    async function deleteStudent(studentId){
        const result=await pool.query(
           `DELETE FROM students WHERE student_id=$1
             RETURNING student_id, first_name, last_name, email,
          year_of_study, phone_number, profile_picture`,
             [studentId]
             );
             return result.rows[0]
    }





module.exports={getAllStudents,getStudentById,getStudentForLogin,createStudent,updateStudent,deleteStudent};