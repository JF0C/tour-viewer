import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { changeRoleAssignment, changeUsernameAdmin, deleteUser, loadAvailableRoles, loadUsersAdmin, validateUserAdmin } from "./adminThunk";
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

const updateUser = (state: IAdminState, changedUser: UserDto) => {
    if (state.userForEditing) {
        state.userForEditing.username = changedUser.username;
        state.userForEditing.roles = changedUser.roles;
        state.userForEditing.validated = changedUser.validated;
    }
    const user = state.users?.find(u => u.id === changedUser.id);
    if (user) {
        user.roles = changedUser.roles;
        user.validated = changedUser.validated;
        user.username = changedUser.username;
    }
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
        builder.addCase(changeRoleAssignment.fulfilled, (state, action) => {
            updateUser(state, action.payload);
            state.loading = false;
        })
        builder.addCase(changeRoleAssignment.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.loading = false;
            state.users = undefined;
            state.userForEditing = undefined;
        })
        builder.addCase(deleteUser.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(changeUsernameAdmin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(changeUsernameAdmin.fulfilled, (state, action) => {
            updateUser(state, action.payload)
            state.loading = false;
        })
        builder.addCase(changeUsernameAdmin.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(validateUserAdmin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(validateUserAdmin.fulfilled, (state, action) => {
            updateUser(state, action.payload);
            state.loading = false;
        })
        builder.addCase(validateUserAdmin.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const adminStateReducer = adminSlice.reducer;
export const { setUserForEditing, setPagination } = adminSlice.actions
