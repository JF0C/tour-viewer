import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDto } from "../dtos/userDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";
import { PagedResult } from "../dtos/pagedResult";
import { roleAssignmentDto } from "../dtos/roleAssignmentDto";
import { ChangeUsernameDto } from "../dtos/changeUsernameDto";

export const loadUsersAdmin = createAsyncThunk('admin-get-users', 
    async (pageRequest: PageRequestDto): Promise<PagedResult<UserDto>> => {
        const url = `${ApiUrls.BaseUrl}${ApiUrls.AdminEndpoint}?` +
            `page=${pageRequest.page}&number=${pageRequest.count}`
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        return response.json();
});

export const loadAvailableRoles = createAsyncThunk('get-roles',
    async (): Promise<string[]> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.AdminRolesEndpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
});

export const changeRoleAssignment = createAsyncThunk('change-role-assignment',
    async (roleAssignment: roleAssignmentDto): Promise<void> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${roleAssignment.userId}/Role/${roleAssignment.role}`;
        await fetch(url, {
            method: roleAssignment.action === 'assign' ? 'PUT' : 'DELETE',
            credentials: 'include'
        })
});

export const validateUserAdmin = createAsyncThunk('validate-user-admin',
    async (userId: number): Promise<void> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${userId}/Validate`;
        await fetch(url, {
            method: 'PUT',
            credentials: 'include'
        })
});

export const changeUsernameAdmin = createAsyncThunk('changeusername-admin',
    async (changeUsername: ChangeUsernameDto): Promise<void> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${changeUsername.id}/Username`;
        await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(changeUsername.username)
        })
});

export const deleteUser = createAsyncThunk('delete-user',
    async (userId: number): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${userId}`,{
            method: 'DELETE',
            credentials: 'include'
        });
});
