import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IViewState {
    menubarOpen: boolean;
    infobarOpen: boolean;
    infobarLarge: boolean;
}

const initialState: IViewState = {
    menubarOpen: false,
    infobarOpen: false,
    infobarLarge: false
}

const viewStateSlice = createSlice({
    name: 'viewState',
    initialState: initialState,
    reducers: {
        setInfobarOpen(state, action: PayloadAction<boolean>) {
            state.infobarOpen = action.payload;
        },
        setInfoBarLarge(state, action: PayloadAction<boolean>) {
            state.infobarLarge = action.payload;
        },
        setMenubarOpen(state, action: PayloadAction<boolean>) {
            state.menubarOpen = action.payload;
        }
    }
})

export const viewStateReducer = viewStateSlice.reducer;
export const {
    setInfobarOpen,
    setInfoBarLarge,
    setMenubarOpen
} = viewStateSlice.actions;

