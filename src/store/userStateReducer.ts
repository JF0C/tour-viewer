import { createSlice } from "@reduxjs/toolkit";
import { UserDetailDto } from "../dtos/userDetailDto";
import { UserReferenceDto } from "../dtos/userReferenceDto";
import { PaginationState } from "./paginationState";
import { searchUsers } from "./userThunk";


export interface IUserState {
    users: UserReferenceDto[];
    loading: boolean;
    userPagination: PaginationState;
    selectedUser?: UserDetailDto
}
const initialState: IUserState = {
    loading: false,
    users: [],
    userPagination: {
        page: 1,
        itemsPerPage: 10,
        totalPages: 1,
        totalItems: 1
    }
}

export const userStateSlice = createSlice({
    name: 'userState',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(searchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.userPagination.totalItems = action.payload.totalItems;
            state.userPagination.page = action.payload.page;
            state.userPagination.totalPages = action.payload.totalPages
            state.loading = false;
        });
        builder.addCase(searchUsers.rejected, (state) => {
            state.loading = false;
        });

    }
});

export const userStateReducer = userStateSlice.reducer;
