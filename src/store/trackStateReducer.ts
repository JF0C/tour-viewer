import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeTrackNameRequest, changeTrackPositionRequest, createTrackRequest, deleteTrackRequest, loadTrackRequest } from "./trackThunk";
import { TrackData } from "../data/trackData";

export interface BoundsInternal {
    south: number;
    west: number;
    north: number;
    east: number;
}

export interface ITrackEntity {
    fileReference: string;
    data: TrackData;
    selected: boolean;
    bounds?: BoundsInternal
}

export interface ITrackState {
    loading: boolean;
    boundsSet: boolean;
    tracks: ITrackEntity[];
}

const initialState: ITrackState = {
    loading: false,
    boundsSet: false,
    tracks: []
}

export const trackStateSlice = createSlice({
    name: 'trackState',
    initialState: initialState,
    reducers: {
        selectTracks(state, action: PayloadAction<string[]>) {
            for (let t of state.tracks.filter(t => action.payload.includes(t.fileReference))) {
                t.selected = true;
            }
            for (let t of state.tracks.filter(t => !action.payload.includes(t.fileReference))) {
                t.selected = false;
            }
            state.boundsSet = false;
            for (let t of state.tracks) {
                t.bounds = undefined;
            }
        },
        clearTracks(state) {
            state.tracks = [];
        },
        setBounds(state, action: PayloadAction<{fileReference: string, bounds: BoundsInternal}>) {
            const track = state.tracks.find(t => t.fileReference === action.payload.fileReference);
            if (track?.bounds) {
                track.bounds.south = action.payload.bounds.south;
                track.bounds.west = action.payload.bounds.west;
                track.bounds.north = action.payload.bounds.north;
                track.bounds.east = action.payload.bounds.east;
            }
            if (track) {
                track.bounds = action.payload.bounds;
            }
        },
        setBoundsSet(state) {
            state.boundsSet = true;
        },
        resetBoundsSet(state) {
            state.boundsSet = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadTrackRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadTrackRequest.fulfilled, (state, action) => {
            state.loading = false;
            let trackEntity = state.tracks.find(t => t.fileReference === action.payload.fileReference);
            
            if (!trackEntity) {
                state.tracks.push({
                    fileReference: action.payload.fileReference,
                    selected: action.payload.selected,
                    data: action.payload.data,
                    bounds: {
                        south: 0,
                        west: 0,
                        north: 0,
                        east: 0
                    }
                });
            }
            else {
                trackEntity.data = action.payload.data;
                trackEntity.fileReference = action.payload.fileReference;
                trackEntity.selected = action.payload.selected;
            }
            state.boundsSet = false;
            for (let t of state.tracks) {
                t.bounds = undefined;
            }
        });
        builder.addCase(loadTrackRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteTrackRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTrackRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteTrackRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeTrackNameRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeTrackNameRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeTrackNameRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(changeTrackPositionRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeTrackPositionRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeTrackPositionRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createTrackRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTrackRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createTrackRequest.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const trackStateReducer = trackStateSlice.reducer;
export const { selectTracks, setBounds, clearTracks, setBoundsSet, resetBoundsSet } = trackStateSlice.actions;