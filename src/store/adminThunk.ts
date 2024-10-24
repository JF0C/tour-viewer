import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";
import { PagedResult } from "../dtos/pagedResult";
import { roleAssignmentDto } from "../dtos/roleAssignmentDto";

export const loadUsersAdmin = createAsyncThunk('get-users', 
    async (pageRequest: PageRequestDto): Promise<PagedResult<UserDto>> => {
        const url = `${ApiUrls.BaseUrl}${ApiUrls.ListUsersAdminEndpoint}?` +
            `page=${pageRequest.page}&number=${pageRequest.count}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        return response.json();
    });

export const loadAvailableRoles = createAsyncThunk('get-roles',
    async (): Promise<string[]> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.AvailableRolesEndpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    });

export const changeRoleAssignment = createAsyncThunk('change-role-assignment',
    async (roleAssignment: roleAssignmentDto): Promise<void> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.UserEndpoint}/${roleAssignment.userId}/Role/${roleAssignment.role}`;
        await fetch(url, {
            method: roleAssignment.action === 'assign' ? 'PUT' : 'DELETE',
            credentials: 'include'
        })
    }

)