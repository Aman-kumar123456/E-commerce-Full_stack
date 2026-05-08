import { Router } from "express";
import auth from "../middleware/auth.js";
import { Addcategorycontroller, Deletecategorycontroller, getcategorycontroller, Updatecategorycontroller } from "../controllers/category.controller.js";

const categoryRouter=Router();


categoryRouter.post("/add-category",auth,Addcategorycontroller);
categoryRouter.get('/get-category',getcategorycontroller);
categoryRouter.put('/update-category',auth,Updatecategorycontroller);
categoryRouter.delete('/delete-category',auth,Deletecategorycontroller);
export default categoryRouter;