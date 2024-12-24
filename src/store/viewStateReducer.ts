import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IViewState {
    menubarOpen: boolean;
    infobarOpen: boolean;
    infobarLarge: boolean;
    progressDetails: boolean;
    mapMode: 'tours' | 'blogPosts';
    dataSelectorBarState: 'show' | 'small' | 'hide';
}

const initialState: IViewState = {
    menubarOpen: false,
    infobarOpen: false,
    infobarLarge: false,
    progressDetails: false,
    mapMode: 'tours',
    dataSelectorBarState: 'hide'
}

const viewStateSlice = createSlice({
    name: 'viewState',
    initialState: initialState,
    reducers: {
        setDataBarState(state, action: PayloadAction<'show' | 'small' | 'hide'>) {
            state.dataSelectorBarState = action.payload;
        },
        setInfobarOpen(state, action: PayloadAction<boolean>) {
            state.infobarOpen = action.payload;
        },
        setInfoBarLarge(state, action: PayloadAction<boolean>) {
            state.infobarLarge = action.payload;
        },
        setMenubarOpen(state, action: PayloadAction<boolean>) {
            state.menubarOpen = action.payload;
        },
        setMapMode(state, action: PayloadAction<'tours' | 'blogPosts'>) {
            state.mapMode = action.payload;
        },
        setProgressDetails(state, action: PayloadAction<boolean>) {
            state.progressDetails = action.payload;
        }
    }
})

export const viewStateReducer = viewStateSlice.reducer;
export const {
    setInfobarOpen,
    setInfoBarLarge,
    setMenubarOpen,
    setDataBarState,
    setMapMode,
    setProgressDetails
} = viewStateSlice.actions;

