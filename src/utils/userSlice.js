import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        details:[{}]
    },
    reducers:{
          viewDetais:(state,action) =>{
           state.details=action.payload
          },
          clearUser:(state) =>{
            state.details.length =0
          }
    }
})

export const {viewDetais,clearUser}= userSlice.actions;
export default userSlice.reducer