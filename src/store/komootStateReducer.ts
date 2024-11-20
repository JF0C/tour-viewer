import { createSlice } from "@reduxjs/toolkit";
import { PaginationState } from "./paginationState";
import { komootLoginRequest, komootToursRequest } from "./komootThunk";
import { KomootTourResponseDto } from "../dtos/komootTourResponseDto";

export interface IKomootState {
    loading: boolean;
    authString?: string;
    userId?: number;
    tourPagination: PaginationState;
    komootTourData?: KomootTourResponseDto;
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
            console.log(action.payload)
            state.komootTourData = action.payload;
            state.tourPagination.page = action.payload.page.number + 1;
            state.tourPagination.totalItems = Math.max(
                action.payload.page.totalElements,
                state.tourPagination.totalItems
            );
            state.tourPagination.totalPages = Math.max(
                action.payload.page.totalPages,
                state.tourPagination.totalPages
            );
            for (let tour of state.komootTourData._embedded.tours) {
                tour.date = new Date(tour.date).valueOf();
                tour.changed_at = new Date(tour.changed_at).valueOf();
            }
            state.loading = false;
        });
        builder.addCase(komootToursRequest.rejected, (state) => {
            state.komootTourData = {
                _embedded: {tours:[]},
                page: {
                    number: 0,
                    totalElements: 0,
                    totalPages: 0,
                    size: 0
                }
            };
            state.loading = false;
        });
    }
});

export const { resetKomootUser } = komootSlice.actions;
export const komootStateReducer = komootSlice.reducer;
