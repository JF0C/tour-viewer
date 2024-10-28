import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateBlogPostDto } from "../dtos/createBlogPostDto";


export interface IBlogPostState {
    editingBlogPost?: CreateBlogPostDto
}

const initialState: IBlogPostState = {}

export const BlogPostSlice = createSlice({
    name: 'blogpostState',
    initialState: initialState,
    reducers: {
        startEditingBlogpost(state, action: PayloadAction<CreateBlogPostDto>) {
            state.editingBlogPost = action.payload;
        },
        changeEditingBlogpostPosition(state, action: PayloadAction<{latitude: number, longitude: number}>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.latitude = action.payload.latitude;
                state.editingBlogPost.longitude = action.payload.longitude;
            }
        }
    }
})

export const BlogPostStateReducer = BlogPostSlice.reducer;

export const { startEditingBlogpost, changeEditingBlogpostPosition } = BlogPostSlice.actions
