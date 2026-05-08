import { configureStore } from '@reduxjs/toolkit'
 import userReducer from '../Store/userSlice.js'
 import productReducer from '../Store/productSlice.js'
 import cartReducer from '../Store/cartSlice.js'
 import addressReducer from '../Store/addressSlice.js'
 import orderReducer from '../Store/orderSlice.js'
export const store = configureStore({
  reducer: {
    user:userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer,
    order:orderReducer
  },
})