import {Router} from "express";
import { avatarUsercontroller, forgotpasswotdcontroller, loginUsercontroller, logoutUsercontroller, refreshtoken, registerUsercontroller, resetnewpassword, userdetailscontroller, userdetailsupdatecontroller, verifyOtpcontroller, verifyregisterotpcontroller } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../utils/multer.js";

const userRouter= Router();

userRouter.post("/register",registerUsercontroller);
userRouter.put("/verifyregister-otp",verifyregisterotpcontroller);
userRouter.post("/login",loginUsercontroller);
userRouter.get("/logout",auth,logoutUsercontroller);
userRouter.put("/update-avatar",auth,upload.single("avatar"),avatarUsercontroller);
userRouter.put("/update-userdetails",auth,userdetailsupdatecontroller);
userRouter.put("/forget-password",forgotpasswotdcontroller);
userRouter.put("/verify-otp",verifyOtpcontroller);
userRouter.put("/reset-newpassword",resetnewpassword);
userRouter.post("/refresh-token",refreshtoken);
userRouter.get("/user-details",auth,userdetailscontroller);
export default userRouter;