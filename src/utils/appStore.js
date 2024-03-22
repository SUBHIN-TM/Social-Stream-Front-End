import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer, 
        //USER SLICE CREATED AND IMPORTED USER REDUCER THAT WE WRITEN CODE
    }

});

export default appStore; // IT WILL EXPORT TO MAIN FOR USE BY PROVIDER,AND IT WILL DECIDE WHICH COMPONENT WILL GET THE ACCESS