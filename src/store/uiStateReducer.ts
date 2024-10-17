import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IUiState {
    currentTours: string[];
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: IUiState = {
    currentTours: [],
    radioGroups: []
}

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: initialState,
    reducers: {
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
});

export const uiStateReducer = uiStateSlice.reducer;
export const { setRadioGroup } = uiStateSlice.actions;
