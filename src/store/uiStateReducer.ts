import { createSlice } from "@reduxjs/toolkit";


export interface IUiState {
    currentLocation: string;
}

const initialState: IUiState = {
    currentLocation: ''
}

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: initialState,
    reducers: {

    }
});

export const uiStateReducer = uiStateSlice.reducer;
