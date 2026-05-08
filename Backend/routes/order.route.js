import {Router} from 'express'
import auth from '../middleware/auth.js';
import { AddorderController, getAllorderscontroller, Stripepaymentcontroller} from '../controllers/order.controller.js';


const orderRouter=Router();

orderRouter.post('/add-order',auth,AddorderController);
orderRouter.post('/stripe-payment-session',auth,Stripepaymentcontroller);
// orderRouter.post('/webhook',webhookStripe);
orderRouter.get('/get-orders',auth,getAllorderscontroller);

export default orderRouter;