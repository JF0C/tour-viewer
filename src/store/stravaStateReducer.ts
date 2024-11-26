import { createSlice } from "@reduxjs/toolkit";
import { AuthToken } from "../data/authToken";
import { PaginationState } from "./paginationState";
import { stravaClientIdRequest, stravaTokenRequest } from "./stravaThunk";

export interface IStravaState {
    loading: boolean;
    clientId?: string;
    tokenData?: AuthToken;
    tourPagination: PaginationState;
}

const initialState: IStravaState = {
    loading: false,
    tourPagination: {
        page: 0,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    }
}

export const stravaSlice = createSlice({
    name: 'stravaState',
    initialState: initialState,
    reducers: {

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
        });
    }
})

export const stravaStateReducer = stravaSlice.reducer;