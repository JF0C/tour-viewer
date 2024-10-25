import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrls } from "../constants/ApiUrls";
import { LoginDto } from "../dtos/loginDto";
import { UserDto } from "../dtos/userDto";
import { ValidateCodeDto } from "../dtos/validateCodeDto";
import { ResetPasswordDto } from "../dtos/resetPasswordDto";
import { ChangePasswordDto } from "../dtos/changePasswordDto";

export const loginRequest = createAsyncThunk('login', async (login: LoginDto): Promise<UserDto> => {
    const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.LoginEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
        credentials: 'include'
    });
    return response.json();
});

export const logoutRequest = createAsyncThunk('logout', async (): Promise<void> => {
    await fetch(`${ApiUrls.BaseUrl + ApiUrls.LogoutEndpoint}`, {
        method: 'POST',
        credentials: 'include'
    });
});

export const validateCodeRequest = createAsyncThunk('validate-code', async (validate: ValidateCodeDto): Promise<UserDto> => {
    const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.ValidateCodeEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validate)
    })

    return response.json()
});

export const accessCodeRequest = createAsyncThunk('request-code', async (email: string): Promise<void> => {
    await fetch(`${ApiUrls.BaseUrl + ApiUrls.RequestCodeEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    });
});

export const resetPasswordRequest = createAsyncThunk('reset-password',
    async (resetPassword: ResetPasswordDto): Promise<UserDto> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.PasswordEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resetPassword)
        });
        return response.json();
});

export const changePasswordRequest = createAsyncThunk('change-password',
    async (changePassword: ChangePasswordDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.PasswordEndpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changePassword),
            credentials: 'include'
        });
});
