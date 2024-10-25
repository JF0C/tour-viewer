import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ITourState {
    loading: boolean;
    currentTours: string[];
    showInfoBar: boolean;
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: ITourState = {
    loading: false,
    showInfoBar: false,
    currentTours: [],
    radioGroups: []
}

export const tourStateSlice = createSlice({
    name: 'tourState',
    initialState: initialState,
    reducers: {
        showInfobar(state, action: PayloadAction<boolean>) {
            state.showInfoBar = action.payload;
        },
        setTours(state, action: PayloadAction<string[]>) {
            state.currentTours = action.payload;
        },
        setRadioGroup(state, action: PayloadAction<{groupId: string, activeItem?: string}>) {
            let entry = state.radioGroups.find(x => x.groupId === action.payload.groupId);
            if (!entry) {
                state.radioGroups.push({ groupId: action.payload.groupId, activeItem: action.payload.activeItem });
                return;
            }
            if (entry.activeItem === action.payload.activeItem) {
                return;
            }
            entry.activeItem = action.payload.activeItem;
        }
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const { setRadioGroup, setTours, showInfobar } = tourStateSlice.actions;
