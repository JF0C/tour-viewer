import { createAsyncThunk } from "@reduxjs/toolkit";
import http from 'axios';
import { ApiUrls } from "../constants/ApiUrls";
import { CreateUserDto } from "../dtos/user/createUserDto";
import { FileUploadDto } from "../dtos/shared/fileUploadDto";
import { PagedResult } from "../dtos/shared/pagedResult";
import { ProfilePictureParametersDto } from "../dtos/user/profilePictureParametersDto";
import { UserDto } from "../dtos/user/userDto";
import { UserPageRequestDto } from "../dtos/user/userPageRequestDto";
import { UserReferenceDto } from "../dtos/user/userReferenceDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createResponseDeleteThunk, createResponsePutThunk } from "./thunkBase";

export const loadLoggedInUser = createGetThunk<UserDto, void>(
    'load-user',
    () => `${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`,
    async (response) => await response.json()
);

export const registerRequest = createPostThunk<number, CreateUserDto>(
    'register',
    () => `${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`,
    async (response) => Number(await response.text())
);

export const changeUsernameRequest = createResponsePutThunk<UserDto, string>(
    'change-username',
    () => `${ApiUrls.BaseUrl + ApiUrls.ChangeUsernameEndpoint}`,
    async (response) => await response.json()
);

export const deleteUserRequest = createDeleteThunk<string>(
    'delete-user',
    () => `${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}`
);

export const searchUsers = createGetThunk<PagedResult<UserReferenceDto>, UserPageRequestDto>(
    'search-users',
    (search) => {
        var url = `${ApiUrls.BaseUrl + ApiUrls.SearchUsersEndpoint}` +
            `?page=${search.page}&number=${search.count}`;
        if (search.username) {
            url += `&username=${search.username}`
        }
        return url;
    },
    async (response) => await response.json()
);

export const uploadProfilePictureRequest = createAsyncThunk(
    'upload-profile-picture',
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

        if (response.status > 399) {
            throw new Error(response.data.toString());
        }

        return response.data as UserDto;
    }
);

export const deleteProfilePictureRequest = createResponseDeleteThunk<UserDto, void>(
    'delete-profile-picture',
    () => `${ApiUrls.BaseUrl + ApiUrls.ProfilePictureEndpoint}`,
    async (response) => await response.json()
);

export const setProfilePictureParametersRequest = createPostThunk<UserDto, ProfilePictureParametersDto>(
    'set-profile-picuture-parameters',
    () => `${ApiUrls.BaseUrl + ApiUrls.ProfilePictureParametersEndpoint}`,
    async (response) => await response.json(),
    (request) => JSON.stringify(JSON.stringify(request))
);
