import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReferenceDto } from "../dtos/userReferenceDto";
import { TourDto } from "../dtos/tourDto";
import { PaginationState } from "./paginationState";
import { createTourRequest, loadTourRequest, searchTours } from "./tourThunk";

export interface ICreateTour {
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
}

export interface ITourState {
    loading: boolean;
    tours: TourDto[];
    selectedTour?: TourDto;
    tourPagination: PaginationState;
    showInfoBar: boolean;
    editingTour: ICreateTour;
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: ITourState = {
    loading: false,
    showInfoBar: false,
    tours: [],
    tourPagination: {
        page: 1,
        totalItems: 1,
        totalPages: 1,
        itemsPerPage: 10
    },
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
        setTracks(state, action: PayloadAction<number[]>) {

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
    },
    extraReducers: (builder) => {
        builder.addCase(createTourRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createTourRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createTourRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(searchTours.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(searchTours.fulfilled, (state, action) => {
            state.loading = false;
            state.tours = action.payload.items;
            for(let t of state.tours) {
                t.startDate = new Date(t.startDate).valueOf();
            }
            state.tourPagination.page = action.payload.page;
            state.tourPagination.totalItems = action.payload.totalItems;
            state.tourPagination.totalPages = action.payload.totalPages;
        })
        builder.addCase(searchTours.rejected, (state) => {
            state.loading = false;
            state.tours = [];
        })
        
        builder.addCase(loadTourRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadTourRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTour = action.payload;
            state.selectedTour.startDate = new Date(state.selectedTour.startDate).valueOf();
        })
        builder.addCase(loadTourRequest.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const { setRadioGroup, showInfobar,
    resetEditingTour, setEditingTourName, setEditingTourStartDate,
    addEditingTourParticipant, removeEditingTourParticipant, setTracks
 } = tourStateSlice.actions;
