//records incoming request
const loggerMiddleware=(req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    //this next is like saying let next middleware or route handler continue
    next()

   
}
 module.exports = loggerMiddleware;