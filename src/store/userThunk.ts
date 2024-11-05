import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrls } from "../constants/ApiUrls";
import { UserDto } from "../dtos/userDto";
import { CreateUserDto } from "../dtos/createUserDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { PagedResult } from "../dtos/pagedResult";
import http from 'axios';
import { FileUploadDto } from "../dtos/fileUploadDto";
import { ProfilePictureParametersDto } from "../dtos/profilePictureParametersDto";

export const loadLoggedInUser = createAsyncThunk('load-user', async (): Promise<UserDto | undefined> => {
    const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    if (response.ok) {
        return response.json();
    }
    return undefined;
})

export const registerRequest = createAsyncThunk('register', async (user: CreateUserDto): Promise<number> => {
    const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return Number(response.text())
});

export const changeUsernameRequest = createAsyncThunk('change-username',
    async (username: string): Promise<UserDto> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.ChangeUsernameEndpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username),
            credentials: 'include'
        });
        return response.json();
    }
);

export const deleteUserRequest = createAsyncThunk('delete-user',
    async (password: string): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password),
            credentials: 'include'
        });
    }
);

export const searchUsers = createAsyncThunk('search-users',
    async (search: PageRequestDto): Promise<PagedResult<UserDto>> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.SearchUsersEndpoint}` +
            `?page=${search.page}&number=${search.count}`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    }
);

export const uploadProfilePictureRequest = createAsyncThunk('upload-profile-picture',
    async (fileUploadDto: FileUploadDto): Promise<UserDto> => {
        const data = new FormData();
        data.append("file", fileUploadDto.file);

        let url = `${ApiUrls.BaseUrl + ApiUrls.ProfilePictureEndpoint}`;
        if (fileUploadDto.blogPostId !== undefined) {
            url += '/' + fileUploadDto.blogPostId;
        }

        const response = await http.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            onUploadProgress: fileUploadDto.onChunk
        });
        return response.data as UserDto;
    }
);

export const deleteProfilePictureRequest = createAsyncThunk('delete-profile-picture',
    async (): Promise<UserDto> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.ProfilePictureEndpoint}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return response.json();
    }
)

export const setProfilePictureParametersRequest = createAsyncThunk('set-profile-picuture-parameters',
    async (parameters: ProfilePictureParametersDto): Promise<UserDto> => {

        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.ProfilePictureParametersEndpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(JSON.stringify(parameters))
        });
        return response.json();
    }
)
