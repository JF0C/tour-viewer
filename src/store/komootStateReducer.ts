import { createSlice } from "@reduxjs/toolkit";
import { PaginationState } from "./paginationState";
import { komootLoginRequest, komootToursRequest } from "./komootThunk";

export interface IKomootState {
    loading: boolean;
    authString?: string;
    userId?: number;
    tourPagination: PaginationState;
}

const initialState: IKomootState = {
    loading: false,
    tourPagination: {
        page: 0,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    }
}

export const komootSlice = createSlice({
    name: 'komootState',
    initialState: initialState,
    reducers: {
        resetKomootUser(state) {
            state.userId = undefined;
            state.authString = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(komootLoginRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(komootLoginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.userId = action.payload.userId;
            state.authString = action.payload.authString;
        });
        builder.addCase(komootLoginRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(komootToursRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(komootToursRequest.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(komootToursRequest.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { resetKomootUser } = komootSlice.actions;
export const komootStateReducer = komootSlice.reducer;
