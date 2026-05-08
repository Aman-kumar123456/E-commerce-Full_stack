import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  Allorder: []
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialvalue,
  reducers: {
    setOrder: (state, action) => {
        // console.log("orders coming from redux is:",...action.payload);
      state.Allorder = [...action.payload]
    },
  },
});
export const {setOrder}=orderSlice.actions
export default orderSlice.reducer
