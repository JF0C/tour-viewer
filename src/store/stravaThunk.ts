import { ApiUrls } from "../constants/ApiUrls";
import { StravaRequestDto } from "../dtos/strava/stravaRequestDto";
import { StravaUserDto } from "../dtos/strava/stravaUserDto";
import { TokenResponseDto } from "../dtos/shared/tokenResponseDto";
import { createAuthenticatedGetThunk, createGetThunk } from "./thunkBase";
import { StravaActivityDto } from "../dtos/strava/stravaActivityDto";
import { StravaActivitiesRequestDto } from "../dtos/strava/stravaActivitiesRequestDto";

export const stravaClientIdRequest = createGetThunk<string, void>(
    'strava-client-id',
    () => `${ApiUrls.BaseUrl + ApiUrls.ExternalSourceEndpoint + ApiUrls.StravaClientIdEndpoint}`,
    async (response) => await response.text()
)

export const stravaTokenRequest = createGetThunk<TokenResponseDto, string>(
    'strava-token',
    (code) => `${ApiUrls.BaseUrl + ApiUrls.ExternalSourceEndpoint + ApiUrls.StravaTokenEndpoint}?code=${code}`,
    async (response) => await response.json()
)

export const stravaUserInfoRequest = createAuthenticatedGetThunk<StravaUserDto, StravaRequestDto>(
    'strava-user-info',
    () => `${ApiUrls.StravaApiUrl}/`,
    'Bearer',
    (request) => request.token,
    async (response) => await response.json()
)

export const stravaActivitiesRequest = createAuthenticatedGetThunk<StravaActivityDto[], StravaActivitiesRequestDto>(
    'strava-activities',
    (request) => `${ApiUrls.StravaApiUrl}/athlete/activities?page=${request.page}&perPage=${request.count}`,
    'Bearer',
    (request) => request.token,
    async (response) => await response.json()
)
