import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { changeRoleAssignment, loadAvailableRoles, loadUsersAdmin } from "./adminThunk";
import { PaginationState } from "./paginationState";

export interface IAdminState
{
    users?: UserDto[];
    availableRoles?: string[];
    userForEditing?: UserDto;
    pagination: PaginationState;
    loading: boolean;
}

const initialState: IAdminState = {
    pagination: {
        page: 1,
        totalPages: 1,
        itemsPerPage: 10,
        totalItems: 10
    },
    loading: false
}

export const adminSlice = createSlice({
    name: 'adminState',
    initialState: initialState,
    reducers: {
        setPagination(state, action: PayloadAction<{page?: number, count?: number}>) {
            state.pagination.itemsPerPage = action.payload.count 
                ?? state.pagination.itemsPerPage;
            state.pagination.page = action.payload.page 
                ?? state.pagination.page;
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
            state.pagination.totalItems = action.payload.totalItems;
            state.pagination.totalPages = action.payload.totalPages;
            state.pagination.page = action.payload.page;

            if (state.userForEditing) {
                const editingUserId = state.userForEditing.id;
                state.userForEditing = action.payload.items.find(u => u.id === editingUserId);
            }

            state.loading = false;
        })
        builder.addCase(loadUsersAdmin.rejected, (state) => {
            state.loading = false;
            state.users = [];
        })

        builder.addCase(loadAvailableRoles.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadAvailableRoles.fulfilled, (state, action) => {
            state.loading = false;
            state.availableRoles = action.payload;
        })
        builder.addCase(loadAvailableRoles.rejected, (state) => {
            state.loading = false;
            state.availableRoles = [];
        })

        builder.addCase(changeRoleAssignment.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(changeRoleAssignment.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(changeRoleAssignment.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const adminStateReducer = adminSlice.reducer;
export const { setUserForEditing, setPagination } = adminSlice.actions
