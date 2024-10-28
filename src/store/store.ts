import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authStateReducer } from './authStateReducer';
import { adminStateReducer } from './adminStateReducer';
import { tourStateReducer } from './tourStateReducer';
import { trackStateReducer } from './trackStateReducer';
import { blogPostStateReducer } from './blogPostStateReducer';

export const store = configureStore({
    reducer: {
        tour: tourStateReducer,
        track: trackStateReducer,
        auth: authStateReducer,
        blog: blogPostStateReducer,
        admin: adminStateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
