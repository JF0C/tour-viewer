import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { addParticipantRequest, changeTourStartDateRequest, createTourRequest, deleteTourRequest, loadTourRequest, removeParticipantRequest, renameTourRequest, searchTours } from "./tourThunk";
import { enqueueSnackbar } from "notistack";
import { loginRequest } from "./authThunk";
import { createTrackRequest } from "./trackThunk";

export interface INotificationState {
    message?: string;
    
}

const initialState: INotificationState = {

}

const snackError = (title: string, error?: SerializedError) => {
    enqueueSnackbar(`Error ${title} ${error?.message ?? ''}`, { variant: 'error' })
}

export const NotificationSlice = createSlice({
    name: 'notificationState',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createTourRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Created Tour ${action.meta.arg.name}`, { variant: 'success' } );
        });
        builder.addCase(createTourRequest.rejected, (_state, action) => {
            snackError('creating tour', action.error);
        });
        
        builder.addCase(deleteTourRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Deleted Tour`, { variant: 'success' });
        });
        builder.addCase(deleteTourRequest.rejected, (_state, action) => {
            snackError('deleting tour', action.error);
        });

        builder.addCase(changeTourStartDateRequest.rejected, (_state, action) => {
            snackError('changing start date', action.error);
        });

        builder.addCase(addParticipantRequest.rejected, (_state, action) => {
            snackError('adding participant', action.error);
        });

        builder.addCase(removeParticipantRequest.rejected, (_state, action) => {
            snackError('removing participant', action.error);
        });

        builder.addCase(loadTourRequest.rejected, (_state, action) => {
            snackError('loading tour', action.error);
        });

        builder.addCase(renameTourRequest.rejected, (_state, action) => {
            snackError('renaming tour', action.error);
        });

        builder.addCase(searchTours.rejected, (_state, action) => {
            snackError('loading tours', action.error);
        });

        builder.addCase(createTrackRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Created Track ${action.meta.arg.name}`, { variant: 'success' });
        });
        builder.addCase(createTrackRequest.rejected, (_state, action) => {
            snackError('creating track', action.error);
        });

        builder.addCase(loginRequest.rejected, () => {
            snackError('logging in')
        });
    }
});

export const notificationReducer = NotificationSlice.reducer;
