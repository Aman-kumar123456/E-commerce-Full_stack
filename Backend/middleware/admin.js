import UserModel from "../models/user.model.js";

const admin = async(request,response,next)=>{
   try {
   const userId=request.userId;

   if(!userId){
    return response.status(500).json({
        message:"Provide user ID first ,first authencate ",
        error:true,
        success:false
    })
   }

   const userDetails=await UserModel.findById(userId);

   if(!userDetails){
    return response.status(400).json({
        message:"User Nor Avilable",
        error:true,
        success:false
    })
   }

   if(userDetails.role!=="ADMIN"){
    return response.status(404).json({
        message:"Unauthorized",
        error:true,
        success:false
    })
   }

   next();

   } catch (error) {
    return response.status(500).json({
        message:error.message||error,
        error:true,
        success:false
    })
   } 
}
export default admin;