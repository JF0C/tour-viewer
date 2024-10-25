import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReferenceDto } from "../dtos/userReferenceDto";

export interface ICreateTour {
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
}

export interface ITourState {
    loading: boolean;
    currentTours: string[];
    showInfoBar: boolean;
    editingTour: ICreateTour;
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: ITourState = {
    loading: false,
    showInfoBar: false,
    currentTours: [],
    radioGroups: [],
    editingTour: {
        name: '',
        startDate: 0,
        participants: []
    }
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
        },
        resetEditingTour(state) {
            state.editingTour = {
                name: '',
                startDate: 0,
                participants: []
            };
        },
        setEditingTourName(state, action: PayloadAction<string>) {
            state.editingTour.name = action.payload;
        },
        setEditingTourStartDate(state, action: PayloadAction<number>) {
            state.editingTour.startDate = action.payload;
            console.log(state.editingTour.startDate)
        },
        addEditingTourParticipant(state, action: PayloadAction<UserReferenceDto>) {
            if (!state.editingTour.participants.find(p => p.id === action.payload.id)) {
                state.editingTour.participants.push(action.payload);
            }
        },
        removeEditingTourParticipant(state, action: PayloadAction<number>) {
            state.editingTour.participants = state.editingTour.participants
                .filter(p => p.id !== action.payload);
        }
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const { setRadioGroup, setTours, showInfobar,
    resetEditingTour, setEditingTourName, setEditingTourStartDate,
    addEditingTourParticipant, removeEditingTourParticipant
 } = tourStateSlice.actions;
