import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";
import { PagedResult } from "../dtos/pagedResult";

export const loadUsersAdmin = createAsyncThunk('get-users', 
    async (pageRequest: PageRequestDto): Promise<PagedResult<UserDto>> => {
        const url = `${ApiUrls.BaseUrl}${ApiUrls.ListUsersAdminEndpoint}?` +
            `page=${pageRequest.page}&number=${pageRequest.count}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        return response.json();
    });