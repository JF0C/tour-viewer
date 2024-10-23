import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authStateReducer } from './authStateReducer';
import { adminStateReducer } from './adminStateReducer';
import { tourStateReducer } from './tourStateReducer';

export const store = configureStore({
    reducer: {
        tour: tourStateReducer,
        auth: authStateReducer,
        admin: adminStateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
