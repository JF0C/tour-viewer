import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReferenceDto } from "../dtos/userReferenceDto";
import { TourDto } from "../dtos/tourDto";
import { PaginationState } from "./paginationState";
import { createTourRequest, loadTourRequest, renameTourRequest, searchTours } from "./tourThunk";
import { EditTrackDto } from "../dtos/editTrackDto";
import { createTrackRequest, deleteTrackRequest } from "./trackThunk";

export interface IEditTour {
    id: number;
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
    tracks: EditTrackDto[]
}

export interface ITourState {
    loading: boolean;
    tours: TourDto[];
    selectedTour?: TourDto;
    tourPagination: PaginationState;
    showInfoBar: boolean;
    editingTour: IEditTour;
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
        id: 0,
        name: '',
        startDate: 0,
        participants: [],
        tracks: []
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
                id: 0,
                name: '',
                startDate: 0,
                participants: [],
                tracks: []
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
        },
        startEditingTour(state, action: PayloadAction<TourDto>) {
            state.editingTour.id = action.payload.id
            state.editingTour.name = action.payload.name;
            state.editingTour.participants = action.payload.participants;
            state.editingTour.startDate = action.payload.startDate;
            state.editingTour.tracks = action.payload.tracks.map(t => { return {
                tourId: action.payload.id,
                id: t.id,
                name: t.name,
                tourPosition: t.tourPosition,
                data: t.fileReference
            }})
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

        builder.addCase(renameTourRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(renameTourRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(renameTourRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteTrackRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteTrackRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteTrackRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(createTrackRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createTrackRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(createTrackRequest.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const { setRadioGroup, showInfobar,
    resetEditingTour, setEditingTourName, setEditingTourStartDate,
    addEditingTourParticipant, removeEditingTourParticipant, setTracks,
    startEditingTour
 } = tourStateSlice.actions;
