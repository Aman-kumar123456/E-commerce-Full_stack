import { createSlice } from "@reduxjs/toolkit";

const initialValue={
allCartitems:[],
TotalPrice:0,
totalDiscountPrice:0,
totalCount:0
}


const cartSlice=createSlice({
    name:'cart',
    initialState:initialValue,
    reducers:{
        setCartitems:(state,action)=>{
            // console.log("cart item sin redux is:",...action.payload)
            state.allCartitems=[...action.payload]
        },
        clearCart:(state)=>{
            state.allCartitems=[]
        }
        
    }
})

 export const {setCartitems,clearCart}=cartSlice.actions
 export default cartSlice.reducer