import { ApiUrls } from "../constants/ApiUrls";
import { StravaRequestDto } from "../dtos/stravaRequestDto";
import { StravaUserDto } from "../dtos/stravaUserDto";
import { TokenResponseDto } from "../dtos/tokenResponseDto";
import { createAuthenticatedGetThunk, createGetThunk } from "./thunkBase";

export const stravaClientIdRequest = createGetThunk<string, void>(
    'strava-client-id',
    () => `${ApiUrls.ExternalSourceEndpoint + ApiUrls.StravaClientIdEndpoint}`,
    async (response) => await response.text()
)

export const stravaTokenRequest = createGetThunk<TokenResponseDto, string>(
    'strava-token',
    (code) => `${ApiUrls.ExternalSourceEndpoint + ApiUrls.StravaTokenEndpoint}?code=${code}`,
    async (response) => await response.json()
)

export const stravaUserInfoRequest = createAuthenticatedGetThunk<StravaUserDto, StravaRequestDto>(
    'strava-user-info',
    () => `${ApiUrls.StravaApiUrl}/`,
    'Bearer',
    (request) => request.token,
    async (response) => await response.json()
)
