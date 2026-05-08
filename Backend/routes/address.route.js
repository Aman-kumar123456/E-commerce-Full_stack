import {Router} from 'express'
import auth from '../middleware/auth.js';
import { AddaddressController, deleteAddresscontroller, editAddressController, getAddresscontroller } from '../controllers/address.controller.js';

const addressRouter=Router();


addressRouter.post('/add-address',auth,AddaddressController);
addressRouter.get('/get-address',auth,getAddresscontroller);
addressRouter.delete('/delete-address',auth,deleteAddresscontroller);
addressRouter.put('/update-address',auth,editAddressController);

export default addressRouter;