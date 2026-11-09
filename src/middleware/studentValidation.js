 function validateStudentQuery(req,res,next){
    const page=req.query.page === undefined ? 1 :Number(req.query.page);
    const limit= req.query.limit === undefined ? 10 :Number(req.query.limit);
    const course=req.query.course;   
    const yearOfStudy=req.query.yearOfStudy; 
    //validate page
    if(!Number.isInteger(page)||page < 1){
        return res.status(400).json({
            success:false,
            message:"Page must be a positive integer",
            error:{
                code:"VALIDATION_ERROR"
            }

        
        })
    }

     //validate limit
     if(!Number.isInteger(limit)|| limit < 1 ||limit > 100){
        return res.status(400).json({
            success:false,
            message:"Limit must be between 1 and 100",
            error:{
                code:"VALIDATION_ERROR"
            }
    
        })
     }

     //validate course
     if(course !==undefined && (
        typeof course !== "string" || course.trim() ===""
     )){
     return res.status(400).json({
        success:false,
        message:"Course filter cannot be empty",
        error:{
            code:"VALIDATION_ERROR"
        }
     })
    }
  //validate yearOfStudy
  if(yearOfStudy !== undefined &&(
    typeof yearOfStudy !=="string" ||
     !Number.isInteger(Number(yearOfStudy)) ||
    Number(yearOfStudy) < 1 ||
    Number(yearOfStudy) > 4
)){
   return  res.status(400).json({
        success:false,
        message:"The year of study must be an interger between 1 and 4",
        error:{
            code:"VALIDATION_ERROR"
        }
    })
}
req.pagination={page,limit};
req.filters={course,
    yearOfStudy:yearOfStudy===undefined ?undefined:Number(yearOfStudy)};

next();
  
}
module.exports=validateStudentQuery;