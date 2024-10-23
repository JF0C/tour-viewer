import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { loadUsersAdmin } from "./adminThunk";


export interface IAdminState
{
    users?: UserDto[];
    userForEditing?: UserDto;
    page: number;
    count: number;
    loading: boolean;
}

const initialState: IAdminState = {
    page: 1,
    count: 10,
    loading: false
}

export const adminSlice = createSlice({
    name: 'adminState',
    initialState: initialState,
    reducers: {
        setPagination(state, action: PayloadAction<{page?: number, count?: number}>) {
            state.count = action.payload.count ?? state.count;
            state.page = action.payload.page ?? state.page;
        },
        setUserForEditing(state, action: PayloadAction<UserDto | undefined>) {
            state.userForEditing = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadUsersAdmin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadUsersAdmin.fulfilled, (state, action) => {
            console.log(action.payload);
            state.users = action.payload.items;
            state.page = action.payload.page;
            state.loading = false;
        })
        builder.addCase(loadUsersAdmin.rejected, (state) => {
            state.loading = false;
            state.users = [];
        })
    }
})

export const adminStateReducer = adminSlice.reducer;
