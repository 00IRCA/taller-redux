import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import postSlice from "./postSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        list: listSlice,
        post: postSlice
    }
})