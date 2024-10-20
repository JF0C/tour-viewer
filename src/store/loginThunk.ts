import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrls } from "../constants/ApiUrls";
import { LoginDto } from "../dtos/loginDto";
import { UserDto } from "../dtos/userDto";

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
