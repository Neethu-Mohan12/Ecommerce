import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import productReducer from "./productSlice/productSlice";




const store=configureStore({
    reducer:{
        user:userReducer,
        products:productReducer
    }
})
export default store
