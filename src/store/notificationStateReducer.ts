import { createSlice } from "@reduxjs/toolkit";
import { createTourRequest } from "./tourThunk";
import { enqueueSnackbar } from "notistack";

export interface INotificationState {
    message?: string;
    
}

const initialState: INotificationState = {

}

export const NotificationSlice = createSlice({
    name: 'notificationState',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createTourRequest.fulfilled, (state, action) => {
            enqueueSnackbar(`Created Tour ${action.meta.arg.name}`, { variant: 'success' } );
        });
        builder.addCase(createTourRequest.rejected, (state, action) => {
            enqueueSnackbar(`Error creating tour: ${action.error.message}`, { variant: 'error' })
        });
    }
});

export const notificationReducer = NotificationSlice.reducer;
