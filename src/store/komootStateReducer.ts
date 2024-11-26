import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationState } from "./paginationState";
import { komootGpxTourRequest, komootLoginRequest, komootToursRequest } from "./komootThunk";
import { KomootTourResponseDto } from "../dtos/komoot/komootTourResponseDto";
import { GpxTourDownload } from "../data/gpxTourDownload";
import { createTrackRequest } from "./trackThunk";
import { ExternalSources } from "../constants/ExternalSources";

export interface IKomootState {
    loading: boolean;
    authString?: string;
    userId?: number;
    tourPagination: PaginationState;
    komootTourData?: KomootTourResponseDto;
    toursToDownload: GpxTourDownload[];
}

const initialState: IKomootState = {
    loading: false,
    tourPagination: {
        page: 0,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    },
    toursToDownload: []
}

export const komootSlice = createSlice({
    name: 'komootState',
    initialState: initialState,
    reducers: {
        resetKomootUser(state) {
            state.userId = undefined;
            state.authString = undefined;
        },
        toggleSelectedKomootTour(state, action: PayloadAction<GpxTourDownload>) {
            if (state.toursToDownload.find(t => t.id === action.payload.id)) {
                state.toursToDownload = state.toursToDownload.filter(x => x.id !== action.payload.id);
            }
            else {
                state.toursToDownload.push(action.payload);
                state.toursToDownload.sort((a, b) => a.date - b.date);
            }
        },
        clearKomootSelectedTours(state) {
            state.toursToDownload = [];
        },
        removeSelectedKomootTour(state, action: PayloadAction<string>) {
            state.toursToDownload = state.toursToDownload.filter(x => x.id !== action.payload);
        },
        changeKomootTourName(state, action: PayloadAction<{id: string, name: string}>) {
            const tour = state.toursToDownload.find(t => t.id === action.payload.id);
            if (tour) {
                tour.name = action.payload.name;
            }
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

        builder.addCase(komootGpxTourRequest.pending, (state, action) => {
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.tourId);
            if (tour) {
                tour.state = 'loading';
            }
        });
        builder.addCase(komootGpxTourRequest.fulfilled, (state, action) => {
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.tourId);
            if (tour) {
                tour.data = action.payload;
            }
        });
        builder.addCase(komootGpxTourRequest.rejected, (state, action) => {
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.tourId);
            if (tour) {
                tour.state = 'error';
            }
        });

        builder.addCase(createTrackRequest.pending, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Komoot) {
                return;
            }
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'loading'
            }
        });
        builder.addCase(createTrackRequest.fulfilled, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Komoot) {
                return;
            }
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'finished'
            }
        });
        builder.addCase(createTrackRequest.rejected, (state, action) => {
            if (action.meta.arg.externalSource !== ExternalSources.Komoot) {
                return;
            }
            const tour = state.toursToDownload.find(t => t.id === action.meta.arg.externalId);
            if (tour) {
                tour.state = 'error'
            }
        });
    }
});

export const {
    resetKomootUser,
    toggleSelectedKomootTour,
    changeKomootTourName,
    removeSelectedKomootTour,
    clearKomootSelectedTours
} = komootSlice.actions;
export const komootStateReducer = komootSlice.reducer;
