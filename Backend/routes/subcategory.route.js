import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubcategory, DeleteSubcategorycontroller, EditSubcategorycontroller, getSubcategory } from "../controllers/subcategory.controller.js";


const subcategoryRouter=Router();

subcategoryRouter.post('/add-subcategory',auth,AddSubcategory);
subcategoryRouter.get('/get-subcategory',getSubcategory);
subcategoryRouter.put('/edit-subcategory',auth,EditSubcategorycontroller);
subcategoryRouter.delete('/delete-subcategory',auth,DeleteSubcategorycontroller);

export default subcategoryRouter;