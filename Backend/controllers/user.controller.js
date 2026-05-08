import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplete from "../utils/verifyemailTemplete.js";
import dotenv from "dotenv";
dotenv.config();
import generateAccesstoken from "../utils/generateAccesstoken.js";
import generateRefreshtoken from "../utils/generateRefreshtoken.js";
import uploadImageClodinary from "../utils/uploadimagecloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgetpasswordTemplete from "../utils/forgotpasswordTemplete.js";

//user register controller.........

export async function registerUsercontroller(request,response){
try {
    const {name,email,password}=request.body;
    if(!name || !email || !password){
        return response.status(400).json({
            success:false,
            message:"please provide all the fields data",
            error:true
        })
    }
    const user=await UserModel.findOne({email});
    if(user){
        return response.status(500).json({
            success:false,
            message:"user already exist with this email",
            error:true
        })
    }
    const passwordhash= await bcryptjs.hash(password,10);

const newuser=await UserModel({name,email,password:passwordhash})
const saveduser=await newuser.save();


// const otp = generateOtp()   ;
// const otp_expiry_time= new Date() +60*60*1000; 

// const userUpdate= await UserModel.findByIdAndUpdate(saveduser._id,{
//     forgot_password_otp:otp,
//     forgot_password_expiry: new Date(otp_expiry_time).toISOString()
// })

const verifyEmail=await sendEmail({
    sendTo:email,
    subject:"Verify your email",
    html: verifyEmailTemplete({name,
        // ,otp:otp
    verifyemailurl:`${process.env.FRONT_END}/verify-email?code=${saveduser._id}`
    })
})
return response.status(201).json({
success:true,
error:false,
message:"registration successfully",
data:saveduser
})

} catch (error) {
   return response.status(500).json({
        success:false,
        message:"Error in registering user",
        error:error.message,

    })
}
}


// export async function registerUsercontroller(request, response) {
//     try {
//         const { name, email, password } = request.body;

//         if (!name || !email || !password) {
//             return response.status(400).json({
//                 success: false,
//                 message: "please provide all the fields data",
//                 error: true
//             });
//         }

//         const user = await UserModel.findOne({ email });

//         if (user) {
//             return response.status(400).json({
//                 success: false,
//                 message: "user already exist with this email",
//                 error: true
//             });
//         }

//         const passwordhash = await bcryptjs.hash(password, 10);

//         // generate OTP
//         const otp = generateOtp();
//         const otp_expiry_time = Date.now() + 60 * 60 * 1000; // 1 hour

//         const newuser = new UserModel({
//             name,
//             email,
//             password: passwordhash,
//             forgot_password_otp: otp,
//             forgot_password_expiry: new Date(otp_expiry_time).toISOString(),
//            verify_email: false
//         });

//         const saveduser = await newuser.save();

//         // send OTP email
//         await sendEmail({
//             sendTo: email,
//             subject: "Verify your email",
//             html: `<h3>Hello ${name}</h3>
//                    <p>Your OTP for email verification is:</p>
//                    <h2>${otp}</h2>
//                    <p>This OTP is valid for 1 hour.</p>`
//         });

//         return response.status(201).json({
//             success: true,
//             error: false,
//             message: "registration successful, please verify OTP",
//             data: saveduser
//         });

//     } catch (error) {
//         return response.status(500).json({
//             success: false,
//             message: "Error in registering user",
//             error: error.message,
//         });
//     }
// }



// verivy email controller......

export async function verifyregisterotpcontroller(request,response){
    try {
        const {email,otp} =request.body;

        const user= await UserModel.findOne({email});
        if (!user){
            return response.status(400).json({
                message:"Email not Exist",
                error:true,
                success:false
            })
        }
        
        if(user.forgot_password_otp !== otp){
            return response.status(400).json({
                message:"Invalid otp",
                error:true,
                success:false
            })
        }
        const currentDate=new Date().toISOString();
        if(user.forgot_password_expiry < currentDate){
            return response.status(400).json({
                message:"otp expired",
                error:true,
                success:false
            })
        }
        return response.json({
            message:"otp verified successfully",
            error:false,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}



// export async function verifyregisterotpcontroller(request, response) {
//     try {
//         const { email, otp } = request.body;

//         if (!email || !otp) {
//             return response.status(400).json({
//                 message: "Email and OTP required",
//                 error: true,
//                 success: false
//             });
//         }

//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return response.status(400).json({
//                 message: "Email not exist",
//                 error: true,
//                 success: false
//             });
//         }

//         if (user.verify_email) {
//             return response.json({
//                 message: "Email already verified",
//                 success: true,
//                 error: false
//             });
//         }

//         if (user. forgot_password_otp !== otp) {
//             return response.status(400).json({
//                 message: "Invalid OTP",
//                 error: true,
//                 success: false
//             });
//         }

//         const currentTime = new Date().toISOString();

//         if (user.forgot_password_expiry  < currentTime) {
//             return response.status(400).json({
//                 message: "OTP expired",
//                 error: true,
//                 success: false
//             });
//         }

//         // mark as verified
//         user.verify_email = true;
//         user.verify_otp = null;
//         user.verify_otp_expiry = null;

//         await user.save();

//         return response.json({
//             message: "Email verified successfully",
//             success: true,
//             error: false
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// }



//login controller


export async function loginUsercontroller(request,response){
try {
    const {email,password}=request.body;

    if(!email || !password){
        return response.status(401).json({
            message:"Provide email and password",
            error:true,
            success:false
        })
    }

    const user= await UserModel.findOne({email});

    if(!user){
        return response.status(400).json({
            message:"user not register",
            error:true,
            success:false
        })
    }
    if(user.status !=="Active"){
        return response.status(400).json({
            message:"conntact to admin",
            error:true,
            success:false
        })
    }

    const checkpassword =await bcryptjs.compare(password,user.password) ;

    if(!checkpassword){
        return response.status(400).json({
            message:"check your password",
            error:true,
            success:false
        })
    }

    const updateuser=await UserModel.findByIdAndUpdate(user?._id,{
        last_login_date:new Date()
    })
const accesstoken=await generateAccesstoken(user._id);
const refreshtoken= await generateRefreshtoken(user._id);

const cookieoption={
    httpOnly:true,
    secure:false,
    sameSite:'Lax'
}
response.cookie("accesstoken",accesstoken,cookieoption);
response.cookie("refreshtoken",refreshtoken,cookieoption);

return response.json({
    message:"Login Successfully",
    error:false,
    success:true,
    data:{
        accesstoken,
        refreshtoken
    }
})
}
   catch(error){
return response.status(500).json({
    message : error.message || error,
    error:true,
    success:false
})
   }
}


// logout controller.......

export async function logoutUsercontroller(request,response){
try {
   const userId=request.userId;

const cookieoption={
    httpOnly:true,
    secure:false,
    sameSite:"Lax"
}

response.clearCookie("accesstoken",cookieoption);
response.clearCookie("refreshtoken",cookieoption);

const removerefreshtoken=await UserModel.findByIdAndUpdate(userId,{
    refresh_token:""
})  

return response.json({
    message:"Logout Successfully",
    error:false,
    success:true
})
}
   catch(error){
return response.status(500).json({
    message : error.message || error,
    error:true,
    success:false
})
   }
}



// update avatar controller.....


export async function avatarUsercontroller(request,response){
try {
    const userId=request.userId;
 const image=request.file;

 const uploadimage =await uploadImageClodinary(image);

 console.log("uploadimage",uploadimage);
const updateavatar=await UserModel.findOneAndUpdate({_id:userId},{
    avatar:uploadimage.url
})

return response.json({
    message:"Avatar Updated Successfully",
    success:true,
    error:false,
    data:{
        _id:userId,
       avatar: uploadimage.url
    }

})
}
   catch(error){
return response.status(500).json({
    message : error.message || error,
    error:true,
    success:false
})
   }
}

//Update user details controller.......

export async function userdetailsupdatecontroller(request,response){
    try {
        const userId=request.userId;
        const {name,email,mobile,password}=request.body;


          let hashpassword;

        if(password){
          hashpassword = await bcryptjs.hash(password,10);

        }

        const updateuserdetails=await UserModel.findOneAndUpdate({_id:userId},{
            ...(name && {name:name}),
            ...(email && {email:email}),
            ...(mobile && {mobile:mobile}),
            ...(password && {password:hashpassword}),

        },
        {  new: true }
    );

        return response.json({
            message:"User details updated successfully",
            error:false,
            success:true,
            data:updateuserdetails
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}







// forget password constroller.......

export async function forgotpasswotdcontroller(request,response){
    try {
        const {email}= request.body;
        
        const user = await UserModel.findOne({email}) ;
        if(!user){
            return response.status(400).json({
                message:"Email not Exist",
                error: true,
                success:false
            })
        }
        const otp=generateOtp();
        const otp_expiry_time= new Date() +60 *60 *1000;
        
        const updateuserotp=await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp:otp,
            forgot_password_expiry:new Date(otp_expiry_time).toISOString()
        })

        const sendotpemail=await sendEmail({
            sendTo:email,
            subject:"password reset otp",
            html:forgetpasswordTemplete({
                otp:otp,
                name:user.name
            })
        })
        return response.json({
            message:"Check your email for otp",
            error:false,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}


// verify otp controller..........

export async function verifyOtpcontroller(request,response){
    try {
        const {email,otp} =request.body;

        const user= await UserModel.findOne({email});
        if (!user){
            return response.status(400).json({
                message:"Email not Exist",
                error:true,
                success:false
            })
        }
        
        if(user.forgot_password_otp !== otp){
            return response.status(400).json({
                message:"Invalid otp",
                error:true,
                success:false
            })
        }
        const currentDate=new Date().toISOString();
        if(user.forgot_password_expiry < currentDate){
            return response.status(400).json({
                message:"otp expired",
                error:true,
                success:false
            })
        }
        const updateuser= await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp:"",
            forgot_password_expiry:"",
        })
        return response.json({
            message:"otp verified successfully",
            error:false,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}


// reset new password...........

export async function resetnewpassword(request,response){
    try {
        const {email,newpassword,repeatnewpassword} =request.body;

        if(!email || !newpassword || !repeatnewpassword){
            return response.status(400).json({
                message:"Provide all required field",
                error:true,
                success:false
            })
        }

        const user =await UserModel.findOne({email});

        if(!user){
            return response.status(400).json({
                message:"email not exist",
                error:true,
                success:false
            })
        }

        if(newpassword!==repeatnewpassword){
            return response.status(400).json({
                message:"newpassword and repeatnewpassword must be same",
                error:true,
                success:false
            })
        }

        const hashnewpassword=await bcryptjs.hash(newpassword,10);

        const updateUserpassword =await UserModel.findByIdAndUpdate(user._id,{
         password:hashnewpassword
        })


        return response.json({
            message:"password reset successfully",
            error:false,
            success:true
        })

    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}






// refresh token controller ..........

export async function refreshtoken(request,response){
    try {
        const refreshtoken= request.cookies.refreshtoken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]
        if(!refreshtoken){
            return response.status(400).json({
                message:"Invalid token",
                error:true,
                success:false
            })
        } 
         const verifytoken= await jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET_KEY)

         if(!verifytoken){
            return response.status(400).json({
                message:"token is expired",
                error:true,
                success:false
            })
         }

         const userId=verifytoken.id;

         const newaccesstoken=generateAccesstoken(userId);
const cookieoption={
    httpOnly:true,
    secure:false,
    sameSite:"Lax"
}
         response.cookie("accesstoken",newaccesstoken,cookieoption);

        return response.json({
            message:"newtoken generated successfully",
            success:true,
            error:false,
            data:{
               accesstoken: newaccesstoken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

// user details controller.......


export async function userdetailscontroller(request,response){
    try {
        const userId=request.userId;

        const user =await UserModel.findById(userId).select('-password -refresh_token');
        // console.log("userDetails ",user);
        if(!user){
            return response.status(400).json({
                message:"user not exist",
                error:true,
                success:false
            })
        }
       return response.json({
        message:"user details got successfully",
        error:false,
        success:true,
        data:user
       })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
}