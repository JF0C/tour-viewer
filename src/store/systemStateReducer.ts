import { createSlice } from "@reduxjs/toolkit"
import { getAppVersion } from "./systemThunk"

export interface ISystemState {
    version?: string
    loading: boolean
}

const initialState: ISystemState = {
    loading: false
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
    }
})

export const systemStateReducer = systemStateSlice.reducer;
