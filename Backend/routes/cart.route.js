import {Router} from 'express'
import auth from '../middleware/auth.js';
import { addtocartcontroller, deleteitemfromcartcontroller, getcartitemcontroller, updatequantityofcartitemcontroller } from '../controllers/cart.controller.js';


const cartRouter=Router();

cartRouter.post('/addtocart',auth,addtocartcontroller);
cartRouter.get('/get-cartitem',auth,getcartitemcontroller);
cartRouter.put('/update-itemquantity',auth,updatequantityofcartitemcontroller);
cartRouter.delete('/delete-cartitem',auth,deleteitemfromcartcontroller);

export default cartRouter;