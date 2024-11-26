import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthToken } from "../data/authToken";
import { PaginationState } from "./paginationState";
import { stravaActivitiesRequest, stravaActivityDetailRequest, stravaClientIdRequest, stravaTokenRequest } from "./stravaThunk";
import { TrackDownloadItem } from "../data/trackDownloadItem";
import { StravaActivityDto } from "../dtos/strava/stravaActivityDto";
import { createTrackRequest } from "./trackThunk";
import { ExternalSources } from "../constants/ExternalSources";

export interface IStravaState {
    loading: boolean;
    clientId?: string;
    tokenData?: AuthToken;
    authenticationFailed: boolean;
    tourPagination: PaginationState;
    tracksToDownload: TrackDownloadItem[];
    tours?: StravaActivityDto[];
}

const initialState: IStravaState = {
    loading: false,
    authenticationFailed: false,
    tourPagination: {
        page: 0,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    },
    tracksToDownload: []
}

export const stravaSlice = createSlice({
    name: 'stravaState',
    initialState: initialState,
    reducers: {
        addTourToDownload(state, action: PayloadAction<TrackDownloadItem>) {
            if (state.tracksToDownload.find(t => t.id === action.payload.id)) {
                return;
            }
            state.tracksToDownload.push(action.payload);
        },
        removeTourToDownload(state, action: PayloadAction<string>) {
            state.tracksToDownload = state.tracksToDownload.filter(t => t.id !== action.payload);
        },
        clearToursToDownload(state) {
            state.tracksToDownload = [];
        },
        renameStravaActivity(state, action: PayloadAction<{id: string, name: string}>) {
            const activity = state.tracksToDownload.find(t => t.id === action.payload.id);
            if (activity) {
                activity.name = action.payload.name;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(stravaClientIdRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(stravaClientIdRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.clientId = action.payload;
        });
        builder.addCase(stravaClientIdRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(stravaTokenRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(stravaTokenRequest.fulfilled, (state, action) => {
            state.tokenData = {
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                expiresAt: action.payload.expires_at,
                expiresIn: action.payload.expires_in
            };
            state.loading = false;
        });
        builder.addCase(stravaTokenRequest.rejected, (state) => {
            state.loading = false;
            state.authenticationFailed = true;
        });

        builder.addCase(stravaActivitiesRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(stravaActivitiesRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticationFailed = false;
            state.tours = action.payload;
            for (let t of state.tours) {
                t.start_date = (new Date(t.start_date)).valueOf();
                t.start_date_local = (new Date(t.start_date_local)).valueOf();
            }
            if (action.payload.length === state.tourPagination.itemsPerPage) {
                state.tourPagination.totalPages = 
                    Math.max(action.meta.arg.page + 1, state.tourPagination.totalPages);
            }
            state.tourPagination.page = action.meta.arg.page;
            state.tourPagination.itemsPerPage = action.meta.arg.count;
        });
        builder.addCase(stravaActivitiesRequest.rejected, (state, action) => {
            state.loading = false;
            state.tours = [];
            if (action.payload?.toString().toLowerCase().includes('authorization failed')) {
                state.authenticationFailed = true;
            }
        });

        builder.addCase(stravaActivityDetailRequest.pending, (state, action) => {
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.activityId);
            if (tour) {
                tour.state = 'loading';
            }
        });
        builder.addCase(stravaActivityDetailRequest.fulfilled, (state, action) => {
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.activityId);
            if (tour) {
                tour.data = action.payload;
            }
        });
        builder.addCase(stravaActivityDetailRequest.rejected, (state, action) => {
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.activityId);
            if (tour) {
                tour.state = 'error';
            }
        });

        builder.addCase(createTrackRequest.pending, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Strava) {
                return;
            }
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'loading'
            }
        });
        builder.addCase(createTrackRequest.fulfilled, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Strava) {
                return;
            }
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'finished'
            }
        });
        builder.addCase(createTrackRequest.rejected, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Komoot) {
                return;
            }
            const tour = state.tracksToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'error'
            }
        });
    }
})

export const {
    addTourToDownload,
    removeTourToDownload,
    clearToursToDownload,
    renameStravaActivity
} = stravaSlice.actions;

export const stravaStateReducer = stravaSlice.reducer;
