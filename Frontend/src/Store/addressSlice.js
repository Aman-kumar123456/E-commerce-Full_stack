import { createSlice } from "@reduxjs/toolkit";

const initialValue={
    allAddress:[]
}

const addressSlice=createSlice({
    name:'address',
    initialState:initialValue,
    reducers:{
        setAlladdress:(state,action)=>{
            // console.log("address coming from redux is:",...action.payload)
            state.allAddress=[...action.payload]
        }
    }
})

export const {setAlladdress} =addressSlice.actions;
export default addressSlice.reducer;