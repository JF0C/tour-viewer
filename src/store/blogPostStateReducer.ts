import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateBlogPostDto } from "../dtos/createBlogPostDto";
import { CoordinatesDto } from "../dtos/coordinatesDto";


export interface IBlogPostState {
    loading: boolean;
    editingBlogPost?: CreateBlogPostDto;
    coordinatesChanged: boolean;
    markerPosition?: CoordinatesDto;
    mapCenter?: CoordinatesDto
}

const initialState: IBlogPostState = {
    loading: false,
    coordinatesChanged: false
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
        resetCoordinatesChanged(state) {
            state.coordinatesChanged = false;
        },
        setMapCenter(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.mapCenter = action.payload;
        },
        changeEditingBlogpostPosition(state, action: PayloadAction<{ latitude: number, longitude: number }>) {
            if (state.editingBlogPost) {
                console.log('latitude: ' + action.payload.latitude + ', longitude: ' + action.payload.longitude)
                state.editingBlogPost.latitude = action.payload.latitude;
                state.editingBlogPost.longitude = action.payload.longitude;
                if (state.editingBlogPost.id !== 0) {
                    state.coordinatesChanged = true;
                }
            }
        },
        changeEditingBlogpostTrack(state, action: PayloadAction<number>) {
            if (state.editingBlogPost) {
                state.editingBlogPost.trackId = action.payload;
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
    }
})

export const blogPostStateReducer = BlogPostSlice.reducer;

export const { setEditingBlogpost, changeEditingBlogpostPosition, changeEditingBlogpostTrack,
    changeEditingBlogpostTitle, changeEditingBlogpostMessage, addImageReferenceToEditingBlogpost,
    setMarkerPosition, setMapCenter, resetCoordinatesChanged
} = BlogPostSlice.actions
