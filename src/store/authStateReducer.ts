import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/user/userDto";
import { accessCodeRequest, changePasswordRequest, loginRequest, logoutRequest, resetPasswordRequest, validateCodeRequest } from "./authThunk";
import { changeUsernameRequest, deleteProfilePictureRequest, deleteUserRequest, loadLoggedInUser, registerRequest, setProfilePictureParametersRequest, uploadProfilePictureRequest } from "./userThunk";
import { setDateNumbers } from "./stateHelpers";


export interface IAuthState {
    loading: boolean;
    user?: UserDto;
    fetchUserAttempted: boolean;
}

const initialState: IAuthState = {
    loading: false,
    fetchUserAttempted: false
}

export const authStateSlice = createSlice({
    name: 'authState',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            setDateNumbers(state.user);
        });
        builder.addCase(loginRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(logoutRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutRequest.fulfilled, (state) => {
            state.loading = false;
            state.user = undefined;
        });
        builder.addCase(logoutRequest.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(loadLoggedInUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loadLoggedInUser.fulfilled, (state, action) => {
            state.fetchUserAttempted = true;
            state.loading = false;
            state.user = action.payload ?? state.user;
            if (state.user) {
                setDateNumbers(state.user);
            }
        });
        builder.addCase(loadLoggedInUser.rejected, (state) => {
            state.fetchUserAttempted = true;
            state.loading = false;
        })

        builder.addCase(registerRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(registerRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(validateCodeRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(validateCodeRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(validateCodeRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(accessCodeRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(accessCodeRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(accessCodeRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(changeUsernameRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(changeUsernameRequest.fulfilled, (state, action) => {
            if (state.user) {
                state.user.username = action.payload.username;
            }
            state.loading = false;
        })
        builder.addCase(changeUsernameRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteUserRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteUserRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteUserRequest.rejected, (state) => {
            state.loading = false;
        })
        
        builder.addCase(changePasswordRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(changePasswordRequest.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(changePasswordRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(resetPasswordRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resetPasswordRequest.fulfilled, (state, action) => {
            state.user = action.payload;
            setDateNumbers(state.user);
            state.loading = false;
        })
        builder.addCase(resetPasswordRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(uploadProfilePictureRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(uploadProfilePictureRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            setDateNumbers(state.user);
        })
        builder.addCase(uploadProfilePictureRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteProfilePictureRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteProfilePictureRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            setDateNumbers(state.user);
        })
        builder.addCase(deleteProfilePictureRequest.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(setProfilePictureParametersRequest.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(setProfilePictureParametersRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            setDateNumbers(state.user);
        })
        builder.addCase(setProfilePictureParametersRequest.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const authStateReducer = authStateSlice.reducer;
