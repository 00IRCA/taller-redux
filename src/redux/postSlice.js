import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addOnlinePosts = createAsyncThunk(
    "post/addOnlinePosts",
    async (id) => {
        const data = await fetch(`http://localhost:3001/posts/${id}`)
            .then(response => response.json())
            .then(data => data)
        return {userId: id, posts: data.posts}
    }
)

function initialState() {
    return {
        posts: {},
        title: "",
        image: "/assets/loro.jpg",
        text: "",
    }
}

const postSlice = createSlice({
    name: "post",
    initialState: initialState(),
    reducers: {
        setPosts: (state, action) => {
            const userId = action.payload
            const post = {
                title: state.title,
                image: state.image,
                text: state.text
            }
            state.posts[userId]
            ? state.posts[userId] = [post, ...state.posts[userId]]
            : state.posts[userId] = [post]
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
        setText: (state, action) => {
            state.text = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addOnlinePosts.fulfilled, (state, action) => {
            const {userId, posts} = action.payload
            state.posts[userId] = posts
        })
    }
})

export const selectPosts = (state) => state.post.posts
export const selectTitle = (state) => state.post.title
export const selectImage = (state) => state.post.image
export const selectText = (state) => state.post.text

export const {setPosts, setTitle, setImage, setText} = postSlice.actions

export default postSlice.reducer