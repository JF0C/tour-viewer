import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthToken } from "../data/authToken";
import { PaginationState } from "./paginationState";
import { stravaActivitiesRequest, stravaClientIdRequest, stravaTokenRequest } from "./stravaThunk";
import { GpxTourDownload } from "../data/gpxTourDownload";
import { StravaActivityDto } from "../dtos/strava/stravaActivityDto";

export interface IStravaState {
    loading: boolean;
    clientId?: string;
    tokenData?: AuthToken;
    authenticationFailed: boolean;
    tourPagination: PaginationState;
    toursToDownload: GpxTourDownload[];
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
    toursToDownload: []
}

export const stravaSlice = createSlice({
    name: 'stravaState',
    initialState: initialState,
    reducers: {
        addTourToDownload(state, action: PayloadAction<GpxTourDownload>) {
            if (state.toursToDownload.find(t => t.id === action.payload.id)) {
                return;
            }
            state.toursToDownload.push(action.payload);
        },
        removeTourToDownload(state, action: PayloadAction<string>) {
            state.toursToDownload = state.toursToDownload.filter(t => t.id !== action.payload);
        },
        clearToursToDownload(state) {
            state.toursToDownload = [];
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
    }
})

export const {
    addTourToDownload,
    removeTourToDownload,
    clearToursToDownload
} = stravaSlice.actions;

export const stravaStateReducer = stravaSlice.reducer;
