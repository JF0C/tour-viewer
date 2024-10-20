import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { loginRequest, logoutRequest } from "./loginThunk";


export interface IUiState {
    loading: boolean;
    currentTours: string[];
    radioGroups: { groupId: string, activeItem?: string }[];
    user?: UserDto;
}

const initialState: IUiState = {
    loading: false,
    currentTours: [],
    radioGroups: []
}

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: initialState,
    reducers: {
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
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        });
        builder.addCase(loginRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(logoutRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutRequest.fulfilled, (state) => {
            state.loading = false;
            state.user = undefined;
        });
        builder.addCase(logoutRequest.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const uiStateReducer = uiStateSlice.reducer;
export const { setRadioGroup, setTours } = uiStateSlice.actions;
