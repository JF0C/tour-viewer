import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "../constants/LocalStorageKeys";
import { EditingTour } from "../data/editingTour";
import { TourSearchFilter } from "../data/tourSearchFilter";
import { TourDto } from "../dtos/tour/tourDto";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";
import { loadBlogPostDetailRequest } from "./blogPostThunk";
import { PaginationState } from "./paginationState";
import { setDateNumbers } from "./stateHelpers";
import { addCountryRequest, createTourRequest, deleteTourRequest, loadTourRequest, removeCountryRequest, renameTourRequest, searchTours } from "./tourThunk";
import { createTrackRequest, deleteTrackRequest } from "./trackThunk";
import { CountryDto } from "../dtos/shared/countryDto";
import { TrackUploadItem } from "../data/trackUploadItem";

export interface ITourState {
    loading: boolean;
    tours: TourDto[];
    toursLoaded: boolean;
    selectedTour?: TourDto;
    selectedTourId?: number;
    tourPagination: PaginationState;
    tourSearchFilter: TourSearchFilter;
    editingTour: EditingTour;
    radioGroups: { groupId: string, activeItem?: string }[];
}

const initialState: ITourState = {
    loading: false,
    toursLoaded: false,
    tours: [],
    tourPagination: {
        page: 1,
        totalItems: 1,
        totalPages: 1,
        itemsPerPage: 6
    },
    tourSearchFilter: {},
    radioGroups: [],
    editingTour: {
        id: 0,
        name: '',
        startDate: 0,
        participants: [],
        tracks: [],
        tracksToMerge: [],
        countries: [],
        tracksToUpload: []
    }
}

export const tourStateSlice = createSlice({
    name: 'tourState',
    initialState: initialState,
    reducers: {
        setSelectedTourId(state, action: PayloadAction<number | undefined>) {
            state.selectedTourId = action.payload;
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
        resetSelectedTour(state) {
            state.selectedTour = undefined;
        },
        resetEditingTour(state) {
            state.editingTour = {
                id: 0,
                name: '',
                startDate: 0,
                participants: [],
                tracks: [],
                tracksToMerge: [],
                countries: [],
                tracksToUpload: []
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
            state.editingTour.countries = action.payload.countries;
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
        addCountryToEditingTour(state, action: PayloadAction<CountryDto>) {
            if (state.editingTour.countries.find(c => c.id === action.payload.id)) {
                return;
            }
            state.editingTour.countries.push(action.payload);
        },
        removeCountryFromEditingTour(state, action: PayloadAction<number>) {
            state.editingTour.countries = state.editingTour.countries
                .filter(c => c.id !== action.payload);
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
        },
        setTourSearchFilter(state, action: PayloadAction<TourSearchFilter>) {
            state.tourSearchFilter = action.payload;
            // state.toursLoaded = false;
        },
        setTourPagination(state, action: PayloadAction<{page?: number, count?: number}>) {
            state.tourPagination.page = action.payload.page ?? state.tourPagination.page;
            state.tourPagination.itemsPerPage = action.payload.count ?? state.tourPagination.itemsPerPage;
        },
        setTracksToUpload(state, action: PayloadAction<TrackUploadItem[]>) {
            state.editingTour.tracksToUpload = action.payload;
        },
        setTrackToUploadName(state, action: PayloadAction<{id: number, name: string}>) {
            const track = state.editingTour.tracksToUpload.find(t => t.id === action.payload.id);
            if (track) {
                track.name = action.payload.name;
            }
        },
        setTrackToUploadTourPosition(state, action: PayloadAction<{id: number, position: number}>) {
            const track = state.editingTour.tracksToUpload.find(t => t.id === action.payload.id);
            if (track) {
                track.tourPosition = action.payload.position;
            }
        },
        setTrackToUploadValid(state, action: PayloadAction<{id: number, valid: boolean}>) {
            const track = state.editingTour.tracksToUpload.find(t => t.id === action.payload.id);
            if (track) {
                track.isValid = action.payload.valid;
            }
        },
        removeTrackToUpload(state, action: PayloadAction<number>) {
            state.editingTour.tracksToUpload = state.editingTour.tracksToUpload.filter(t => t.id !== action.payload);
        },
        clearTracksToUpload(state) {
            state.editingTour.tracksToUpload = [];
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
            state.toursLoaded = false;
        })
        builder.addCase(searchTours.fulfilled, (state, action) => {
            state.loading = false;
            state.tours = action.payload.items;
            for (let t of state.tours) {
                t.startDate = new Date(t.startDate).valueOf();
                for (let point of t.previewTrack) {
                    point.time = new Date(point.time).valueOf();
                }
                setDateNumbers(t);
                for (let track of t.tracks) {
                    setDateNumbers(track);
                }
            }
            state.tourPagination.totalItems = action.payload.totalItems;
            state.tourPagination.totalPages = action.payload.totalPages;
            state.toursLoaded = true;
        })
        builder.addCase(searchTours.rejected, (state) => {
            state.loading = false;
            state.tours = [];
            state.toursLoaded = true;
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
            localStorage.setItem(LocalStorageKeys.SelectedTourIdKey, JSON.stringify(action.payload.id));
            for (let point of state.selectedTour.previewTrack) {
                point.time = new Date(point.time).valueOf();
            }
            setDateNumbers(state.selectedTour);
            for (let track of state.selectedTour.tracks) {
                setDateNumbers(track);
            }
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

        builder.addCase(createTrackRequest.pending, (state, action) => {
            const track = state.editingTour.tracksToUpload
                .find(t => t.id === action.meta.arg.id);
            if (track) {
                track.state = 'loading'
            }
        })
        builder.addCase(createTrackRequest.fulfilled, (state, action) => {
            const track = state.editingTour.tracksToUpload
                .find(t => t.id === action.meta.arg.id);
            if (track) {
                track.state = 'finished'
            }
        })
        builder.addCase(createTrackRequest.rejected, (state, action) => {
            const track = state.editingTour.tracksToUpload
                .find(t => t.id === action.meta.arg.id);
            if (track) {
                track.state = 'error'
            }
        });

        builder.addCase(addCountryRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addCountryRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addCountryRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(removeCountryRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeCountryRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(removeCountryRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(loadBlogPostDetailRequest.fulfilled, (state, action) => {
            if (!state.selectedTour) {return;}
            for (let track of state.selectedTour.tracks) {
                for (let index in track.blogPosts) {
                    if (track.blogPosts[index].id === action.payload.id) {
                        track.blogPosts[index] = action.payload;
                    }
                }
            }
        })
    }
})

export const tourStateReducer = tourStateSlice.reducer;
export const {
    setRadioGroup,
    setSelectedTourId,
    resetSelectedTour,
    resetEditingTour,
    setEditingTourName,
    setEditingTourStartDate,
    addEditingTourParticipant,
    removeEditingTourParticipant,
    setEditingTour,
    clearTracksToMerge,
    addTrackToMerge,
    removeTrackToMerge,
    setTourSearchFilter,
    setTourPagination,
    addCountryToEditingTour,
    removeCountryFromEditingTour,
    setTracksToUpload,
    setTrackToUploadName,
    setTrackToUploadTourPosition,
    setTrackToUploadValid,
    removeTrackToUpload,
    clearTracksToUpload
} = tourStateSlice.actions;
