import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../utils/multer.js";
import { Uploadimagecontroller } from "../controllers/uploadimage.controller.js";



 const uploadimageRouter=Router();

 uploadimageRouter.put('/uploadcategoryimage',auth,upload.single("image"),Uploadimagecontroller);

 export default uploadimageRouter;