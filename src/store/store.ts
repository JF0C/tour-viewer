import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authStateReducer } from './authStateReducer';
import { adminStateReducer } from './adminStateReducer';
import { tourStateReducer } from './tourStateReducer';
import { trackStateReducer } from './trackStateReducer';
import { blogPostStateReducer } from './blogPostStateReducer';
import { notificationReducer } from './notificationStateReducer';
import { userStateReducer } from './userStateReducer';
import { systemStateReducer } from './systemStateReducer';
import { komootStateReducer } from './komootStateReducer';
import { stravaStateReducer } from './stravaStateReducer';
import { mapStateReducer } from './mapStateReducer';

export const store = configureStore({
    reducer: {
        tour: tourStateReducer,
        track: trackStateReducer,
        auth: authStateReducer,
        user: userStateReducer,
        blog: blogPostStateReducer,
        admin: adminStateReducer,
        notification: notificationReducer,
        system: systemStateReducer,
        komoot: komootStateReducer,
        strava: stravaStateReducer,
        map: mapStateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
