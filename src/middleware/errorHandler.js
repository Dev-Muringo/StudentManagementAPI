 const multer=require ('multer');
 function errorHandler(err,req,res,next){
    console.log("ERROR DETAILS:", err);
    if(err instanceof multer.MulterError){

        //handle multer errors
        if(err.code==='LIMIT_FILE_SIZE'){
            return res.status(400).json({
                success:false,
                message:"Image exceeds the maximum allowed size of 2MB"
            })
        }
        return res.status(400).json({
    success: false,
    message: err.message
}); 
 } 
      //handle invalid file types
   if (err.message === "Only JPEG and PNG images are allowed") {
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
    //handle unexpected errors
return res.status(500).json({
    success: false,
    message: "Internal server error"
});
    }
    


module.exports=errorHandler;