import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeTrackNameRequest, changeTrackPositionRequest, createTrackRequest, deleteTrackRequest, loadTrackRequest } from "./trackThunk";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { TrackEntity } from "../data/trackEntity";
import { GeoBounds } from "../data/geoBounds";
import { Color } from "../data/color";
import { TrackMarkerData } from "../data/trackMarkerReference";
import { loadTourRequest } from "./tourThunk";

export interface ITrackState {
    loading: boolean;
    boundsSet: boolean;
    markerReferences: TrackMarkerData[];
    dataPointLocation?: CoordinatesDto;
    targetCoordinates?: CoordinatesDto;
    tracks: TrackEntity[];
    graphData: {
        selectedValue?: 'velocity' | 'elevation' | 'slope',
        min: number,
        max: number,
        minColor: Color,
        maxColor: Color
    }
}

const initialState: ITrackState = {
    loading: false,
    boundsSet: false,
    tracks: [],
    markerReferences: [],
    graphData: {
        min: 0,
        max: 0,
        minColor: { r: 0, g: 0, b: 255 },
        maxColor: { r: 255, g: 0, b: 0 }
    }
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
        startLoadingTrack(state, action: PayloadAction<{fileReference: string, id: number}>) {
            const track = state.tracks.find(t => t.fileReference === action.payload.fileReference);
            if (track) {
                track.loading = true;
            }
            else {
                state.tracks.push({
                    id: action.payload.id,
                    fileReference: action.payload.fileReference,
                    data: {
                        name: '',
                        elevation: {
                            average: 0,
                            minimum: 0,
                            maximum: 0,
                            positive: 0,
                            negative: 0
                        },
                        distance: 0,
                        points: [],
                        pointsTenth: [],
                        pointsHundredth: [],
                        totalTime: 1,
                        totalMovementTime: 1,
                    },
                    selected: false,
                    loading: true,
                    tourPosition: 0
                })
            }
        },
        clearTracks(state) {
            state.tracks = [];
        },
        setBounds(state, action: PayloadAction<{ fileReference: string, bounds: GeoBounds }>) {
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
        setDataPointLocation(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.dataPointLocation = action.payload;
        },
        setBoundsSet(state) {
            state.boundsSet = true;
        },
        resetBoundsSet(state) {
            state.boundsSet = false;
        },
        setTargetCoordinates(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.targetCoordinates = action.payload;
        },
        setGraphDataBounds(state, action: PayloadAction<{min: number, max: number}>) {
            state.graphData.min = action.payload.min;
            state.graphData.max = action.payload.max;
        },
        setGraphDataSource(state, action: PayloadAction<'velocity' | 'elevation' | 'slope' | undefined>) {
            state.graphData.selectedValue = action.payload;
        },
        addTrackMarkerReference(state, action: PayloadAction<TrackMarkerData>) {
            if (!state.markerReferences.find(r => r.id === action.payload.id && r.type === action.payload.type)) {
                state.markerReferences.push(action.payload);
                state.markerReferences.sort((a, b) => a.tourDistance - b.tourDistance);
            }
        },
        selectMarkerReference(state, action: PayloadAction<{id: number, type: 'blogPost' | 'limitMarker'} | undefined>) {
            for (let markerReference of state.markerReferences) {
                if (markerReference.id === action.payload?.id && markerReference.type === action.payload?.type) {
                    markerReference.selected = true;
                }
                else {
                    markerReference.selected = false;
                }
            }
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
                trackEntity = {
                    id: action.payload.id,
                    fileReference: action.payload.fileReference,
                    selected: action.payload.selected,
                    data: action.payload.data,
                    tourPosition: action.payload.tourPosition,
                    loading: false,
                    bounds: {
                        south: 0,
                        west: 0,
                        north: 0,
                        east: 0
                    }
                };
                state.tracks.push(trackEntity);
            }
            else {
                trackEntity.id = action.payload.id;
                trackEntity.data = action.payload.data;
                trackEntity.fileReference = action.payload.fileReference;
                trackEntity.selected = action.payload.selected;
                trackEntity.loading = false;
                trackEntity.tourPosition = action.payload.tourPosition;
            }
            
            state.boundsSet = false;
            for (let t of state.tracks) {
                t.bounds = undefined;
            }
            state.tracks = state.tracks.sort((a, b) => a.tourPosition - b.tourPosition)
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

        builder.addCase(loadTourRequest.fulfilled, (state) => {
            state.markerReferences = [];
        });
    }
});

export const trackStateReducer = trackStateSlice.reducer;
export const {
    selectTracks,
    setBounds,
    clearTracks,
    setBoundsSet,
    resetBoundsSet,
    startLoadingTrack,
    setTargetCoordinates,
    setDataPointLocation,
    setGraphDataBounds,
    setGraphDataSource,
    addTrackMarkerReference,
    selectMarkerReference
} = trackStateSlice.actions;
