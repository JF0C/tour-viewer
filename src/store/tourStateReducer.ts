import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";
import { TourDto } from "../dtos/tour/tourDto";
import { PaginationState } from "./paginationState";
import { createTourRequest, deleteTourRequest, getDefaultTourId, loadTourRequest, renameTourRequest, searchTours, setSelectedTourId } from "./tourThunk";
import { EditTrackDto } from "../dtos/track/editTrackDto";
import { createTrackRequest, deleteTrackRequest } from "./trackThunk";

export interface IEditTour {
    id: number;
    name: string;
    startDate: number;
    participants: UserReferenceDto[];
    tracks: EditTrackDto[];
    tracksToMerge: string[];
}

export interface ITourState {
    loading: boolean;
    tours: TourDto[];
    selectedTourId?: number;
    selectedTour?: TourDto;
    tourPagination: PaginationState;
    showInfoBar: boolean;
    infoBarFull: boolean;
    dataSelectorBarState: 'show' | 'small' | 'hide';
    editingTour: IEditTour;
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: ITourState = {
    loading: false,
    showInfoBar: false,
    infoBarFull: false,
    dataSelectorBarState: 'hide',
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
        tracks: [],
        tracksToMerge: []
    }
}

export const tourStateSlice = createSlice({
    name: 'tourState',
    initialState: initialState,
    reducers: {
        showInfobar(state, action: PayloadAction<boolean>) {
            state.showInfoBar = action.payload;
        },
        setInfoBarFull(state, action: PayloadAction<boolean>) {
            state.infoBarFull = action.payload;
        },
        setDataBarState(state, action: PayloadAction<'show' | 'small' | 'hide'>) {
            state.dataSelectorBarState = action.payload;
        },
        setRadioGroup(state, action: PayloadAction<{ groupId: string, activeItem?: string }>) {
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
                tracks: [],
                tracksToMerge: []
            };
        },
        setEditingTourName(state, action: PayloadAction<string>) {
            state.editingTour.name = action.payload;
        },
        setEditingTourStartDate(state, action: PayloadAction<number>) {
            state.editingTour.startDate = action.payload;
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
        setEditingTour(state, action: PayloadAction<TourDto>) {
            state.editingTour.id = action.payload.id
            state.editingTour.name = action.payload.name;
            state.editingTour.participants = action.payload.participants;
            state.editingTour.startDate = action.payload.startDate;
            state.editingTour.tracks = action.payload.tracks.map(t => {
                return {
                    tourId: action.payload!.id,
                    id: t.id,
                    name: t.name,
                    tourPosition: t.tourPosition,
                    data: t.fileReference
                }
            })
        },
        clearTracksToMerge(state) {
            state.editingTour.tracksToMerge = [];
        },
        addTrackToMerge(state, action: PayloadAction<string>) {
            if (!state.editingTour.tracksToMerge.includes(action.payload)) {
                state.editingTour.tracksToMerge.push(action.payload);
            }
        },
        removeTrackToMerge(state, action: PayloadAction<string>) {
            state.editingTour.tracksToMerge = state.editingTour.tracksToMerge.filter(t => t !== action.payload);
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
            for (let t of state.tours) {
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
            state.selectedTour.tracks = state.selectedTour.tracks
                .sort((a, b) => a.tourPosition - b.tourPosition);
            state.selectedTour.startDate = new Date(state.selectedTour.startDate).valueOf();
            state.selectedTourId = action.payload.id;
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

        builder.addCase(deleteTourRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteTourRequest.fulfilled, (state) => {
            state.loading = false;
            state.selectedTour = undefined;
        })
        builder.addCase(deleteTourRequest.rejected, (state) => {
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

        builder.addCase(getDefaultTourId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getDefaultTourId.fulfilled, (state, action) =>{
            state.loading = false;
            state.selectedTourId = action.payload
        })
        builder.addCase(getDefaultTourId.rejected, (state) => {
            state.loading = false;
            state.selectedTourId = 0;
        })

        builder.addCase(setSelectedTourId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(setSelectedTourId.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTourId = action.meta.arg;
        })
        builder.addCase(setSelectedTourId.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const {
    setRadioGroup,
    showInfobar,
    resetEditingTour,
    setEditingTourName,
    setEditingTourStartDate,
    addEditingTourParticipant,
    removeEditingTourParticipant,
    setEditingTour,
    setDataBarState,
    setInfoBarFull,
    clearTracksToMerge,
    addTrackToMerge,
    removeTrackToMerge
} = tourStateSlice.actions;
