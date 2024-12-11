import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPostDto } from "../dtos/blogPost/blogPostDto";
import { CreateBlogPostDto } from "../dtos/blogPost/createBlogPostDto";
import { changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, changeBlogPostTrackRequest, createBlogPostRequest, deleteBlogPostRequest, loadBlogPostDetailRequest, searchBlogPostRequest } from "./blogPostThunk";
import { createCommentRequest, deleteCommentRequest, editCommentRequest } from "./commentThunk";
import { deleteImageRequest, uploadImageRequest } from "./filesThunk";
import { PaginationState } from "./paginationState";
import { BlogPostSearchFilter } from "../data/blogPostSearchFilter";
import { setDateNumbers } from "./stateHelpers";
import { addLabelToBlogPostRequest, loadBlogPostLabelsRequest, removeLabelFromBlogPostRequest } from "./blogPostLabelThunk";

export interface IBlogPostState {
    loading: boolean;
    editingBlogPost?: CreateBlogPostDto;
    selectedBlogPost?: BlogPostDto;
    coordinatesChanged: boolean;
    fullSizeImages: string[];
    selectedFullSizeImage?: string;

    availableLabels: string[];
    availableLabelsLoaded: boolean;
    blogPosts: BlogPostDto[];
    blogPostsLoaded: boolean;
    pagination: PaginationState;
    filter: BlogPostSearchFilter;
}

const initialState: IBlogPostState = {
    loading: false,
    coordinatesChanged: false,
    fullSizeImages: [],

    availableLabelsLoaded: false,
    availableLabels: [],
    blogPosts: [],
    blogPostsLoaded: false,
    pagination: {
        page: 1,
        itemsPerPage: 10,
        totalPages: 0,
        totalItems: 0
    },
    filter: {}
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
        addEditingBlogPostLabel(state, action: PayloadAction<string>) {
            if (state.editingBlogPost && !state.editingBlogPost.labels.includes(action.payload)) {
                state.editingBlogPost.labels.push(action.payload);
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
        },
        setBlogPostSearchFilter(state, action: PayloadAction<BlogPostSearchFilter>) {
            state.filter = action.payload;
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
        builder.addCase(changeBlogPostMessageRequest.fulfilled, (state, action) => {
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
            for (let c of action.payload.comments ?? []) {
                setDateNumbers(c);
            }
            state.selectedBlogPost = action.payload;
            setDateNumbers(state.selectedBlogPost);
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

        builder.addCase(searchBlogPostRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchBlogPostRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.blogPostsLoaded = true;
            state.blogPosts = action.payload.items;
            for (let b of state.blogPosts) {
                setDateNumbers(b);
                for (let c of b.comments ?? []) {
                    setDateNumbers(c);
                }
            }
            state.pagination.page = action.payload.page;
            state.pagination.itemsPerPage = action.meta.arg.count;
            state.pagination.totalPages = action.payload.totalPages;
            state.pagination.totalItems = action.payload.totalItems;
        });
        builder.addCase(searchBlogPostRequest.rejected, (state) => {
            state.loading = false;
            state.blogPostsLoaded = true;
            state.blogPosts = [];
        });

        builder.addCase(addLabelToBlogPostRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addLabelToBlogPostRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addLabelToBlogPostRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(removeLabelFromBlogPostRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeLabelFromBlogPostRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(removeLabelFromBlogPostRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(loadBlogPostLabelsRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadBlogPostLabelsRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.availableLabels = action.payload;
            state.availableLabelsLoaded = true;
        });
        builder.addCase(loadBlogPostLabelsRequest.rejected, (state) => {
            state.loading = false;
            state.availableLabels = [];
            state.availableLabelsLoaded = true;
        });
    }
});

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
    setFullSizeImages,
    setBlogPostSearchFilter
} = BlogPostSlice.actions
