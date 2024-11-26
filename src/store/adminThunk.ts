import { ApiUrls } from "../constants/ApiUrls";
import { ChangeUsernameDto } from "../dtos/user/changeUsernameDto";
import { PagedResult } from "../dtos/shared/pagedResult";
import { PageRequestDto } from "../dtos/shared/pageRequestDto";
import { RoleAssignmentDto } from "../dtos/admin/roleAssignmentDto";
import { UserDto } from "../dtos/user/userDto";
import { createDeleteThunk, createGetThunk, createResponseDeleteThunk, createResponsePutThunk } from "./thunkBase";

export const loadUsersAdmin = createGetThunk<PagedResult<UserDto>, PageRequestDto>(
    'admin-get-users',
    (pageRequest) => `${ApiUrls.BaseUrl}${ApiUrls.AdminEndpoint}?` +
        `page=${pageRequest.page}&number=${pageRequest.count}`,
    async (response) => await response.json()
)

export const loadAvailableRoles = createGetThunk<string[], void>(
    'get-roles',
    () => `${ApiUrls.BaseUrl + ApiUrls.AdminRolesEndpoint}`,
    async (response) => await response.json()
);

export const addRoleRequest = createResponsePutThunk<UserDto, RoleAssignmentDto>(
    'add-role-assignment',
    (roleAssignment) => `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${roleAssignment.userId}/Role/${roleAssignment.role}`,
    async (response) => await response.json()
);

export const removeRoleRequest = createResponseDeleteThunk<UserDto, RoleAssignmentDto>(
    'remove-role-assignment',
    (roleAssignment) => `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${roleAssignment.userId}/Role/${roleAssignment.role}`,
    async (response) => await response.json()
)

export const validateUserAdmin = createResponsePutThunk<UserDto, number>(
    'validate-user-admin',
    (userId) => `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${userId}/Validate`,
    async (response) => await response.json()
)

export const changeUsernameAdmin = createResponsePutThunk<UserDto, ChangeUsernameDto>(
    'change-username-admin',
    (changeUsername) => `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${changeUsername.id}/Username`,
    async (response) => await response.json(),
    (changeUsername) => JSON.stringify(changeUsername.username)
);

export const deleteUser = createDeleteThunk<number>(
    'delete-user-admin',
    (userId) => `${ApiUrls.BaseUrl + ApiUrls.AdminEndpoint}/${userId}`
);
