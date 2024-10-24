import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { accessCodeRequest, loadLoggedInUser, loginRequest, logoutRequest, registerRequest, validateCodeRequest } from "./loginThunk";


export interface IAuthState {
    loading: boolean;
    user?: UserDto;
    afterLoginPath?: string;
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
            console.log(state.user);
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
    }
});

export const authStateReducer = authStateSlice.reducer;
