import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetailDto } from "../dtos/user/userDetailDto";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";
import { PaginationState } from "./paginationState";
import { searchUsers } from "./userThunk";
import { searchToursForUser } from "./tourThunk";
import { searchBlogPostsForUser } from "./blogPostThunk";

export interface IUserState {
    users?: UserReferenceDto[];
    loading: boolean;
    userPagination: PaginationState;
    selectedUser?: UserDetailDto
}
const initialState: IUserState = {
    loading: false,
    userPagination: {
        page: 1,
        itemsPerPage: 10,
        totalPages: 2,
        totalItems: 1
    }
}

export const userStateSlice = createSlice({
    name: 'userState',
    initialState: initialState,
    reducers: {
        setUserDetail(state, action: PayloadAction<UserReferenceDto>) {
            state.selectedUser = {
                id: action.payload.id,
                username: action.payload.username,
                profilePictureId: action.payload.profilePictureId,
                profilePictureParameters: action.payload.profilePictureParameters,
                toursPerPage: 10,
                blogPostsPerPage: 10
            }
        },
        setUserPagination(state, action: PayloadAction<{page?: number, count?: number}>) {
            state.userPagination.page = action.payload.page ?? state.userPagination.page;
            state.userPagination.itemsPerPage = action.payload.count ?? state.userPagination.itemsPerPage;   
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.userPagination.totalItems = action.payload.totalItems;
            state.userPagination.page = action.payload.page;
            state.userPagination.totalPages = action.payload.totalPages;
            state.loading = false;
        });
        builder.addCase(searchUsers.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(searchToursForUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchToursForUser.fulfilled, (state, action) => {
            state.loading = false;
            if (state.selectedUser) {
                state.selectedUser.tours = action.payload;
            }
        });
        builder.addCase(searchToursForUser.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(searchBlogPostsForUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchBlogPostsForUser.fulfilled, (state, action) => {
            state.loading = false;
            if (state.selectedUser) {
                state.selectedUser.blogPosts = action.payload;
            }
        });
        builder.addCase(searchBlogPostsForUser.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const userStateReducer = userStateSlice.reducer;

export const {
    setUserDetail,
    setUserPagination
} = userStateSlice.actions;