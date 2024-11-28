import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPostDto } from "../dtos/blogPost/blogPostDto";
import { CreateBlogPostDto } from "../dtos/blogPost/createBlogPostDto";
import { changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, changeBlogPostTrackRequest, createBlogPostRequest, deleteBlogPostRequest, loadBlogPostDetailRequest } from "./blogPostThunk";
import { createCommentRequest, deleteCommentRequest, editCommentRequest } from "./commentThunk";
import { deleteImageRequest, uploadImageRequest } from "./filesThunk";

export interface IBlogPostState {
    loading: boolean;
    editingBlogPost?: CreateBlogPostDto;
    selectedBlogPost?: BlogPostDto;
    coordinatesChanged: boolean;
    fullSizeImages: string[];
    selectedFullSizeImage?: string;
}

const initialState: IBlogPostState = {
    loading: false,
    coordinatesChanged: false,
    fullSizeImages: []
}

export const BlogPostSlice = createSlice({
    name: 'blogpostState',
    initialState: initialState,
    reducers: {
        setEditingBlogpost(state, action: PayloadAction<CreateBlogPostDto | undefined>) {
            state.editingBlogPost = action.payload;
            state.coordinatesChanged = false;
        },
        setSelectedBlogpost(state, action: PayloadAction<BlogPostDto | undefined>) {
            state.selectedBlogPost = action.payload;
        },
        resetCoordinatesChanged(state) {
            state.coordinatesChanged = false;
        },
        changeEditingBlogpostPosition(state, action: PayloadAction<{ latitude: number, longitude: number }>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.latitude = action.payload.latitude;
                state.editingBlogPost.longitude = action.payload.longitude;
                state.coordinatesChanged = true;
            }
        },
        changeEditingBlogpostTrack(state, action: PayloadAction<{trackId: number, trackFileReference: string}>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.trackId = action.payload.trackId;
                state.editingBlogPost.trackFileReference = action.payload.trackFileReference;
            }
        },
        changeEditingBlogpostTitle(state, action: PayloadAction<string>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.title = action.payload;
            }
        },
        changeEditingBlogpostMessage(state, action: PayloadAction<string>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.message = action.payload;
            }
        },
        addImageReferenceToEditingBlogpost(state, action: PayloadAction<string>) {
            if (state.editingBlogPost) {
                if (!state.editingBlogPost.images.includes(action.payload)) {
                    state.editingBlogPost.images.push(action.payload);
                }
            }
        },
        setFullSizeImages(state, action: PayloadAction<{items: string[], selectedItem?: string}>) {
            state.fullSizeImages = action.payload.items;
            state.selectedFullSizeImage = action.payload.selectedItem;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBlogPostRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBlogPostRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createBlogPostRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeBlogPostTitleRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeBlogPostTitleRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeBlogPostTitleRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeBlogPostMessageRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeBlogPostMessageRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeBlogPostMessageRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeBlogPostLocationRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeBlogPostLocationRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeBlogPostLocationRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeBlogPostTrackRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeBlogPostTrackRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeBlogPostTrackRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteBlogPostRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBlogPostRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteBlogPostRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(uploadImageRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadImageRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(uploadImageRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteImageRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteImageRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteImageRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(loadBlogPostDetailRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadBlogPostDetailRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedBlogPost = action.payload;
            state.selectedBlogPost.created = new Date(state.selectedBlogPost.created);
            if (state.selectedBlogPost.comments) {
                for (let comment of state.selectedBlogPost.comments) {
                    comment.created = new Date(comment.created);
                }
            }
        });
        builder.addCase(loadBlogPostDetailRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createCommentRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCommentRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createCommentRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(editCommentRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editCommentRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(editCommentRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteCommentRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCommentRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteCommentRequest.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const blogPostStateReducer = BlogPostSlice.reducer;

export const {
    setEditingBlogpost,
    changeEditingBlogpostPosition,
    changeEditingBlogpostTrack,
    changeEditingBlogpostTitle,
    changeEditingBlogpostMessage,
    addImageReferenceToEditingBlogpost,
    resetCoordinatesChanged,
    setSelectedBlogpost,
    setFullSizeImages
} = BlogPostSlice.actions
