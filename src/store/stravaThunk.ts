import { ApiUrls } from "../constants/ApiUrls";
import { stravaTimeSeriesToGpx } from "../converters/stravaTimeSeriesConverter";
import { TokenResponseDto } from "../dtos/shared/tokenResponseDto";
import { StravaActivitiesRequestDto } from "../dtos/strava/stravaActivitiesRequestDto";
import { StravaActivityDetailRequestDto } from "../dtos/strava/stravaActivityDetailRequestDto";
import { StravaActivityDto } from "../dtos/strava/stravaActivityDto";
import { StravaRequestDto } from "../dtos/strava/stravaRequestDto";
import { StravaUserDto } from "../dtos/strava/stravaUserDto";
import { createAuthenticatedGetThunk, createGetThunk } from "./thunkBase";

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

export const stravaRefreshRequest = createGetThunk<TokenResponseDto, string>(
    'strava-refresh',
    (refreshToken) => `${ApiUrls.BaseUrl + ApiUrls.ExternalSourceEndpoint + ApiUrls.StravaRefreshEndpoint}?refreshToken=${refreshToken}`,
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

export const stravaActivityDetailRequest = createAuthenticatedGetThunk<string, StravaActivityDetailRequestDto>(
    'strava-activity-detail',
    (request) => `${ApiUrls.StravaApiUrl}/activities/${request.activityId}/streams?keys=latlng,altitude,time`,
    'Bearer',
    (request) => request.token,
    async (response, request) => stravaTimeSeriesToGpx(await response.json(), request!)
)
