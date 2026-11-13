const multer=require('multer');
const crypto=require('crypto');
const path=require('path');
const allowedMimeTypes=['image/jpeg','image/png'];
//validate file 
function fileFilter(req,file,cb){
    console.log("Uploaded MIME type:", file.mimetype);
console.log("Uploaded filename:", file.originalname);

    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true);

    }else{
        cb(new Error("Only JPEG and PNG images are allowed"))

    }

}


//where to store 
const storage=multer.diskStorage({

    destination:function(req,file,cb){
     cb(null,'uploads/students');
     

    },
    filename:function(req,file,cb){
    const uniqueName=crypto.randomUUID();
    const fileExtension=path.extname(file.originalname);
     const newFilename= `${uniqueName}${fileExtension}`;
     cb(null,newFilename);

    }
})







//create the upload middleware
const upload=multer({storage,
    fileFilter,
    limits:{
        fileSize:2*1024*1024
    }

});

module.exports=upload;
