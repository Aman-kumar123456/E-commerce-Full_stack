import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model.js";
dotenv.config();

const generateRefreshtoken= async(userId)=>{
const token= jwt.sign({id:userId},
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {expiresIn:'7d'}
)

const updateuserrefreshtoken=await UserModel.updateOne(
    {_id:userId},
    {refresh_token:token}
)
return token;
} 

export default generateRefreshtoken;