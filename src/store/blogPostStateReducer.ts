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
        setEditingBlogpost(state, action: PayloadAction<CreateBlogPostDto | undefined>) {
            state.editingBlogPost = action.payload;
        },
        changeEditingBlogpostPosition(state, action: PayloadAction<{latitude: number, longitude: number}>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.latitude = action.payload.latitude;
                state.editingBlogPost.longitude = action.payload.longitude;
            }
        },
        changeEditingBlogpostTrack(state, action: PayloadAction<number>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.trackId = action.payload;
            }
        }
    }
})

export const blogPostStateReducer = BlogPostSlice.reducer;

export const { setEditingBlogpost, changeEditingBlogpostPosition, changeEditingBlogpostTrack } = BlogPostSlice.actions
