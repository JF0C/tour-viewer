import { createSlice } from "@reduxjs/toolkit"
import { cleanupImagesAndTracks, getAppVersion, loadCountriesRequest } from "./systemThunk"
import { CountryDto } from "../dtos/shared/countryDto";

export interface ISystemState {
    version?: string;
    loading: boolean;
    cleanupResult: string[];
    countries: CountryDto[];
    countriesLoaded: boolean;
}

const initialState: ISystemState = {
    loading: false,
    cleanupResult: [],
    countries: [],
    countriesLoaded: false
}

export const systemStateSlice = createSlice({
    name: 'systemState',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAppVersion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAppVersion.rejected, (state) => {
            state.loading = false;
            state.version = 'error'
        });
        builder.addCase(getAppVersion.fulfilled, (state, action) => {
            state.loading = false;
            state.version = action.payload;
        });

        builder.addCase(cleanupImagesAndTracks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cleanupImagesAndTracks.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(cleanupImagesAndTracks.fulfilled, (state, action) => {
            state.loading = false;
            state.cleanupResult = action.payload;
        });

        builder.addCase(loadCountriesRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadCountriesRequest.rejected, (state) => {
            state.loading = false;
            state.countriesLoaded = true;
        });
        builder.addCase(loadCountriesRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.countriesLoaded = true;
            state.countries = action.payload;
        });
    }
})

export const systemStateReducer = systemStateSlice.reducer;
