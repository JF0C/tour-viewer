import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateBlogPostDto } from "../dtos/createBlogPostDto";
import { CoordinatesDto } from "../dtos/coordinatesDto";
import { changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, changeBlogPostTrackRequest, createBlogPostRequest, deleteBlogPostRequest } from "./blogPostThunk";


export interface ClickedEvent {
    time: number;
    location?: CoordinatesDto;
}

export interface IBlogPostState {
    loading: boolean;
    editingBlogPost?: CreateBlogPostDto;
    coordinatesChanged: boolean;
    markerPosition?: CoordinatesDto;
    mapCenter?: CoordinatesDto;
    clickedEvent: ClickedEvent;
}

const initialState: IBlogPostState = {
    loading: false,
    coordinatesChanged: false,
    clickedEvent: {
        time: 0
    }
}

export const BlogPostSlice = createSlice({
    name: 'blogpostState',
    initialState: initialState,
    reducers: {
        setEditingBlogpost(state, action: PayloadAction<CreateBlogPostDto | undefined>) {
            state.editingBlogPost = action.payload;
            state.coordinatesChanged = false;
        },
        setMarkerPosition(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.markerPosition = action.payload;
        },
        setClickedEvent(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.clickedEvent.location = action.payload;
            state.clickedEvent.time = new Date().valueOf();
        },
        resetCoordinatesChanged(state) {
            state.coordinatesChanged = false;
        },
        setMapCenter(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.mapCenter = action.payload;
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
    }
})

export const blogPostStateReducer = BlogPostSlice.reducer;

export const { setEditingBlogpost, changeEditingBlogpostPosition, changeEditingBlogpostTrack,
    changeEditingBlogpostTitle, changeEditingBlogpostMessage, addImageReferenceToEditingBlogpost,
    setMarkerPosition, setMapCenter, resetCoordinatesChanged, setClickedEvent
} = BlogPostSlice.actions
