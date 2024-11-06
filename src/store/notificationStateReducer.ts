import { createSlice } from "@reduxjs/toolkit";

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
        
    }
});

export const notificationReducer = NotificationSlice.reducer;
