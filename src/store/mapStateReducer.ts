import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoordinatesDto } from "../dtos/shared/coordinatesDto";
import { GeoBounds } from "../data/geoBounds";

export interface IMapState {
    tapPosition?: {x: number, y: number}
    releasePosition?: {x: number, y: number}
    clickedEvent: {
        location?: CoordinatesDto,
        time: number
    },
    isDraggingMarker: boolean;
    markerPosition?: CoordinatesDto;
    mapCenter?: CoordinatesDto;
    zoomLevel: number;
    markerReferenceId?: number;
    viewBounds: GeoBounds;
}

const initialState: IMapState = {
    clickedEvent: {time: 0},
    isDraggingMarker: false,
    zoomLevel: 13,
    viewBounds: {
        north: 0,
        west: 0,
        south: 0,
        east: 0
    }
}

const mapSlice = createSlice({
    name: 'mapState',
    initialState: initialState,
    reducers: {
        setTapPosition(state, action: PayloadAction<{x: number, y: number} | undefined>) {
            state.tapPosition = action.payload;
        },
        setReleasePosition(state, action: PayloadAction<{x: number, y: number} | undefined>) {
            state.releasePosition = action.payload;
        },
        setClickedEvent(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.clickedEvent.location = action.payload;
            state.clickedEvent.time = Date.now();
        },
        setMarkerDragging(state, action: PayloadAction<boolean>) {
            state.isDraggingMarker = action.payload;
        },
        setMarkerPosition(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.markerPosition = action.payload;
        },
        setZoomLevel(state, action: PayloadAction<number>) {
            state.zoomLevel = action.payload;
        },
        setMapCenter(state, action: PayloadAction<CoordinatesDto | undefined>) {
            state.mapCenter = action.payload;
        },
        setMapBounds(state, action: PayloadAction<GeoBounds>) {
            state.viewBounds = action.payload;
        },
        setMarkerReferenceId(state, action: PayloadAction<number | undefined>) {
            state.markerReferenceId = action.payload;
        }
    }
});

export const mapStateReducer = mapSlice.reducer;
export const {
    setTapPosition,
    setReleasePosition,
    setClickedEvent,
    setMarkerDragging,
    setMarkerPosition,
    setZoomLevel,
    setMapCenter,
    setMarkerReferenceId,
    setMapBounds
} = mapSlice.actions;
