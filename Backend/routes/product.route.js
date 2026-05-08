import {Router} from 'express'
import auth from '../middleware/auth.js';
import { Addproductccontroller, deleteproductcontroller, editproductcontroller, FetchproductBycategorycontroller, getproductbycategoryidAndsubCategoryidcontroller, getproductcontroller, getproductDetailscontroller, getproductonsearchcontroller } from '../controllers/product.controller.js';
import admin from '../middleware/admin.js';


const productRouter= Router();

productRouter.post('/add-product',auth,admin,Addproductccontroller);
productRouter.post('/get-product',getproductcontroller);
productRouter.post('/fetch-productby-category',FetchproductBycategorycontroller);
productRouter.post('/get-productby-categoryId-subcategoryId',getproductbycategoryidAndsubCategoryidcontroller)
productRouter.post('/get-productdetails',getproductDetailscontroller);
productRouter.put('/update-product-details',auth,admin,editproductcontroller);
productRouter.delete('/delete-product',auth,admin,deleteproductcontroller);
productRouter.post('/get-product-search',getproductonsearchcontroller);

export default productRouter;