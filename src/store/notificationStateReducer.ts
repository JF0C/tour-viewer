import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { addRoleRequest, changeUsernameAdmin, deleteUser, loadAvailableRoles, loadUsersAdmin, removeRoleRequest, validateUserAdmin } from "./adminThunk";
import { accessCodeRequest, changePasswordRequest, loginRequest, logoutRequest, resetPasswordRequest, validateCodeRequest } from "./authThunk";
import { changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, changeBlogPostTrackRequest, createBlogPostRequest, deleteBlogPostRequest, loadBlogPostDetailRequest } from "./blogPostThunk";
import { addParticipantRequest, changeTourStartDateRequest, createTourRequest, deleteTourRequest, loadTourRequest, removeParticipantRequest, renameTourRequest, searchTours } from "./tourThunk";
import { changeTrackNameRequest, changeTrackPositionRequest, createTrackRequest, deleteTrackRequest } from "./trackThunk";
import { changeUsernameRequest, deleteUserRequest, registerRequest } from "./userThunk";
import { createCommentRequest, deleteCommentRequest, editCommentRequest } from "./commentThunk";
import { getAppVersion } from "./systemThunk";
import { komootLoginRequest, komootToursRequest } from "./komootThunk";

export interface INotificationState {
    message?: string;
    
}

const initialState: INotificationState = {

}

const snackError = (title: string, error?: SerializedError) => {
    enqueueSnackbar(`Error ${title} ${error?.message ?? ''}`, { variant: 'error' })
}

export const NotificationSlice = createSlice({
    name: 'notificationState',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginRequest.rejected, () => {
            snackError('logging in');
        });

        builder.addCase(logoutRequest.rejected, () => {
            snackError('logging out');
        });

        builder.addCase(validateCodeRequest.fulfilled, () => {
            enqueueSnackbar(`Code validated`, { variant: 'success' });
        });
        builder.addCase(validateCodeRequest.rejected, (_state, action) => {
            snackError('validating code', action.error);
        });

        builder.addCase(accessCodeRequest.fulfilled, () => {
            enqueueSnackbar('Requested access code', { variant: 'success' });
        });
        builder.addCase(accessCodeRequest.rejected, (_state, action) => {
            snackError('requesting access code', action.error);
        });

        builder.addCase(resetPasswordRequest.rejected, (_state, action) => {
            snackError('resetting password', action.error);
        });

        builder.addCase(changePasswordRequest.fulfilled, () => {
            enqueueSnackbar('Changed password', { variant: 'success' });
        });
        builder.addCase(changePasswordRequest.rejected, (_state, action) => {
            snackError('changing password', action.error);
        });

        builder.addCase(createTourRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Created Tour ${action.meta.arg.name}`, { variant: 'success' });
        });
        builder.addCase(createTourRequest.rejected, (_state, action) => {
            snackError('creating tour', action.error);
        });
        
        builder.addCase(deleteTourRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Deleted Tour`, { variant: 'success' });
        });
        builder.addCase(deleteTourRequest.rejected, (_state, action) => {
            snackError('deleting tour', action.error);
        });

        builder.addCase(changeTourStartDateRequest.rejected, (_state, action) => {
            snackError('changing start date', action.error);
        });

        builder.addCase(addParticipantRequest.rejected, (_state, action) => {
            snackError('adding participant', action.error);
        });

        builder.addCase(removeParticipantRequest.rejected, (_state, action) => {
            snackError('removing participant', action.error);
        });

        builder.addCase(loadTourRequest.rejected, (_state, action) => {
            snackError('loading tour', action.error);
        });

        builder.addCase(renameTourRequest.rejected, (_state, action) => {
            snackError('renaming tour', action.error);
        });

        builder.addCase(searchTours.rejected, (_state, action) => {
            snackError('loading tours', action.error);
        });

        builder.addCase(createTrackRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Created Track ${action.meta.arg.name}`, { variant: 'success' });
        });
        builder.addCase(createTrackRequest.rejected, (_state, action) => {
            snackError('creating track', action.error);
        });

        builder.addCase(deleteTrackRequest.rejected, (_state, action) => {
            snackError('deleting track', action.error);
        });

        builder.addCase(changeTrackNameRequest.rejected, (_state, action) => {
            snackError('renaming track', action.error);
        });

        builder.addCase(loadBlogPostDetailRequest.rejected, (_state, action) => {
            snackError('loading blog post', action.error)
        });

        builder.addCase(changeTrackPositionRequest.rejected, (_state, action) => {
            snackError('changing track position', action.error)
        });

        builder.addCase(createBlogPostRequest.rejected, (_state, action) => {
            snackError('creating blog post', action.error);
        });
        builder.addCase(createBlogPostRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Created blog post ${action.meta.arg.title}`, { variant: 'success' });
        });

        builder.addCase(changeBlogPostTitleRequest.rejected, (_state, action) => {
            snackError('changing blog post title', action.error);
        });

        builder.addCase(changeBlogPostMessageRequest.rejected, (_state, action) => {
            snackError('changing blog post message', action.error);
        });

        builder.addCase(changeBlogPostLocationRequest.rejected, (_state, action) => {
            snackError('changing blog post location', action.error);
        });

        builder.addCase(changeBlogPostTrackRequest.rejected, (_state, action) => {
            snackError('changing blog post track', action.error);
        });

        builder.addCase(deleteBlogPostRequest.fulfilled, () => {
            enqueueSnackbar(`Deleted blog post`, { variant: 'success' });
        });
        builder.addCase(deleteBlogPostRequest.rejected, (_state, action) => {
            snackError('deleting blog post', action.error);
        });

        builder.addCase(loadUsersAdmin.rejected, (_state, action) => {
            snackError('loading users', action.error);
        });

        builder.addCase(loadAvailableRoles.rejected, (_state, action) => {
            snackError('loading roles', action.error);
        });

        builder.addCase(addRoleRequest.rejected, (_state, action) => {
            snackError('adding role', action.error);
        });

        builder.addCase(removeRoleRequest.rejected, (_state, action) => {
            snackError('removing role', action.error);
        });

        builder.addCase(validateUserAdmin.rejected, (_state, action) => {
            snackError('validating user', action.error);
        });

        builder.addCase(changeUsernameAdmin.rejected, (_state, action) => {
            snackError('changing username', action.error);
        });

        builder.addCase(deleteUser.fulfilled, () => {
            enqueueSnackbar(`Deleted user`, { variant: 'success' });
        });
        builder.addCase(deleteUser.rejected, (_state, action) => {
            snackError('deleting user', action.error);
        });

        builder.addCase(registerRequest.rejected, (_state, action) => {
            snackError('registering', action.error);
        });
        builder.addCase(registerRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`User ${action.meta.arg.username} registered`, { variant: 'success' });
        });

        builder.addCase(changeUsernameRequest.rejected, (_state, action) => {
            snackError('changing username', action.error);
        });

        builder.addCase(deleteUserRequest.rejected, (_state, action) => {
            snackError('deleting user', action.error);
        });

        builder.addCase(createCommentRequest.rejected, (_state, action) => {
            snackError('creating comment', action.error);
        });

        builder.addCase(editCommentRequest.rejected, (_state, action) => {
            snackError('editing comment', action.error);
        });

        builder.addCase(deleteCommentRequest.rejected, (_state, action) => {
            snackError('deleting comment', action.error);
        });

        builder.addCase(getAppVersion.rejected, (_state, action) => {
            snackError('loading version', action.error);
        });

        builder.addCase(komootLoginRequest.rejected, (_state, action) => {
            snackError('logging into Komoot', action.error);
        });

        builder.addCase(komootToursRequest.rejected, (_state, action) => {
            snackError('loading Komoot tours', action.error);
        });
    }
});

export const notificationReducer = NotificationSlice.reducer;
