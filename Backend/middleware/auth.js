import jwt from "jsonwebtoken";
const auth = async(request,response,next)=>{
   try {
    const accesstoken=request.cookies.accesstoken || request?.headers?.authorization?.split(" ")[1];
console.log("token",accesstoken);
    if(!accesstoken){
        return response.status(500).json({
            message:"provide token",
            error:true,
            success:false
        })
    }

    const decode = jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET_KEY);

    if(!decode){
       return response.status(401).json({
        message:"Unauthorized",
        error:true,
        success:false
       })
    }     
    
    request.userId=decode.id;
    next();

   } catch (error) {
    return response.status(500).json({
        message:error.message||error,
        error:true,
        success:false
    })
   } 
}
export default auth;