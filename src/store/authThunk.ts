import { ApiUrls } from "../constants/ApiUrls";
import { ChangePasswordDto } from "../dtos/user/changePasswordDto";
import { LoginDto } from "../dtos/auth/loginDto";
import { ResetPasswordDto } from "../dtos/auth/resetPasswordDto";
import { UserDto } from "../dtos/user/userDto";
import { ValidateCodeDto } from "../dtos/auth/validateCodeDto";
import { createPostThunk, createPutThunk } from "./thunkBase";

export const loginRequest = createPostThunk<UserDto, LoginDto>(
    'login',
    () => `${ApiUrls.BaseUrl + ApiUrls.LoginEndpoint}`,
    async (response) => await response.json()
)

export const logoutRequest = createPostThunk<void, void>(
    'logout',
    () => `${ApiUrls.BaseUrl + ApiUrls.LogoutEndpoint}`,
    async () => {}
)

export const validateCodeRequest = createPostThunk<UserDto, ValidateCodeDto>(
    'validate-code',
    () => `${ApiUrls.BaseUrl + ApiUrls.ValidateCodeEndpoint}`,
    async (response) => await response.json()
)

export const accessCodeRequest = createPostThunk<void, string>(
    'request-code',
    () => `${ApiUrls.BaseUrl + ApiUrls.RequestCodeEndpoint}`,
    async () => {}
)

export const resetPasswordRequest = createPostThunk<UserDto, ResetPasswordDto>(
    'reset-password',
    () => `${ApiUrls.BaseUrl + ApiUrls.PasswordEndpoint}`,
    async (response) => await response.json()
);

export const changePasswordRequest = createPutThunk<ChangePasswordDto>(
    'change-password',
    () => `${ApiUrls.BaseUrl + ApiUrls.PasswordEndpoint}`
);

