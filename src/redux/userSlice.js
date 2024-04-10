import { createSlice } from "@reduxjs/toolkit";
import { addList } from "./listSlice";
import { setPosts } from "./postSlice";

const initialState = () => {
    return {
        isListAdded: false,
        isPostAdded: false,
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState(),
    reducers:{},
    extraReducers: builder => {
        builder.addCase(addList, state => {
            state.isListAdded = true
        }),
        builder.addCase(setPosts, state => {
            state.isPostAdded = true
        })
    }
})

export const isSecretAvailable = (state) => {
    return (state.user.isListAdded === true && state.user.isPostAdded == true)
}

export default userSlice.reducer