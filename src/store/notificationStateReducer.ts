import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { addRoleRequest, changeUsernameAdmin, deleteUser, loadAvailableRoles, loadUsersAdmin, removeRoleRequest, validateUserAdmin } from "./adminThunk";
import { accessCodeRequest, changePasswordRequest, loginRequest, logoutRequest, resetPasswordRequest, validateCodeRequest } from "./authThunk";
import { changeBlogPostCountryRequest, changeBlogPostLocationRequest, changeBlogPostMessageRequest, changeBlogPostTitleRequest, changeBlogPostTrackRequest, createBlogPostRequest, deleteBlogPostRequest, loadBlogPostDetailRequest, searchBlogPostRequest } from "./blogPostThunk";
import { addCountryRequest, addParticipantRequest, changeTourStartDateRequest, createTourRequest, deleteTourRequest, loadTourRequest, removeCountryRequest, removeParticipantRequest, renameTourRequest, searchTours } from "./tourThunk";
import { changeTrackNameRequest, changeTrackPositionRequest, createTrackRequest, deleteTrackRequest } from "./trackThunk";
import { changeUsernameRequest, deleteUserRequest, registerRequest } from "./userThunk";
import { createCommentRequest, deleteCommentRequest, editCommentRequest } from "./commentThunk";
import { cleanupImagesAndTracks, countryInUseJobRequest, getAppVersion } from "./systemThunk";
import { komootLoginRequest, komootToursRequest } from "./komootThunk";
import { addLabelToBlogPostRequest, createLabelRequest, deleteLabelRequest, loadBlogPostLabelsRequest, removeLabelFromBlogPostRequest } from "./blogPostLabelThunk";

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

        builder.addCase(addCountryRequest.rejected, (_state, action) => {
            snackError('adding country', action.error);
        });

        builder.addCase(removeCountryRequest.rejected, (_state, action) => {
            snackError('removing country', action.error);
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

        builder.addCase(changeBlogPostCountryRequest.rejected, (_state, action) => {
            snackError('changing blog post country', action.error);
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

        builder.addCase(searchBlogPostRequest.rejected, (_state, action) => {
            snackError('loading blog posts', action.error);
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

        builder.addCase(createLabelRequest.rejected, (_state, action) => {
            snackError(`creating label "${action.meta.arg}"`, action.error);
        });
        builder.addCase(createLabelRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Label "${action.meta.arg}" created`, { variant: 'success' });
        });

        builder.addCase(deleteLabelRequest.rejected, (_state, action) => {
            snackError(`deleting label "${action.meta.arg}"`, action.error);
        });
        builder.addCase(deleteLabelRequest.fulfilled, (_state, action) => {
            enqueueSnackbar(`Label "${action.meta.arg}" deleted`, { variant: 'success' });
        });

        builder.addCase(addLabelToBlogPostRequest.rejected, (_state, action) => {
            snackError(`adding label "${action.meta.arg}"`);
        });

        builder.addCase(removeLabelFromBlogPostRequest.rejected, (_state, action) => {
            snackError(`removing label "${action.meta.arg}"`);
        });

        builder.addCase(loadBlogPostLabelsRequest.rejected, (_state, action) => {
            snackError('loading blog post labels');
        });

        builder.addCase(cleanupImagesAndTracks.fulfilled, (_state, action) => {
            if (action.meta.arg === false) {
                enqueueSnackbar('Finished cleaning up Images and Tracks', { variant: 'success' });
            }
        });
        builder.addCase(cleanupImagesAndTracks.rejected, () => {
            snackError('cleaning up Images and Tracks');
        });

        builder.addCase(countryInUseJobRequest.fulfilled, () => {
            enqueueSnackbar('Finished checking if countries are used', { variant: 'success' });
        });
        builder.addCase(countryInUseJobRequest.rejected, () => {
            snackError('checking if countries are used');
        });
    }
});

export const notificationReducer = NotificationSlice.reducer;
