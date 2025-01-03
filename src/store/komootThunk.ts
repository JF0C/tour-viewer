import { ApiUrls } from "../constants/ApiUrls";
import { KomootLoginResponseDto } from "../dtos/komoot/komootLoginResponseDto";
import { KomootPageRequestDto } from "../dtos/komoot/komootPageRequestDto";
import { KomootTourCoordinatesDto } from "../dtos/komoot/komootTourCoordinatesDto";
import { KomootTourRequestDto } from "../dtos/komoot/komootTourRequestDto";
import { KomootTourResponseDto } from "../dtos/komoot/komootTourResponseDto";
import { LoginDto } from "../dtos/auth/loginDto";
import { basicAuthorization, createAuthenticatedGetThunk } from "./thunkBase";

export const komootLoginRequest = createAuthenticatedGetThunk<KomootLoginResponseDto, LoginDto>(
    'komoot-login',
    (login) => `${ApiUrls.KomootLoginUrl}/${login.email}/`,
    'Basic',
    basicAuthorization,
    async (response, login) => { 
        const content = await response.json();
        return {
            userId: Number(content['username']),
            authString: login ? basicAuthorization(login) : undefined
        };
    }
)

export const komootToursRequest = createAuthenticatedGetThunk<KomootTourResponseDto, KomootPageRequestDto>(
    'komoot-tours',
    (pageRequest) => `${ApiUrls.KomootApiUrl}/users/${pageRequest.userId}/tours/` +
        `?sort_types=&type=tour_recorded&sort_field=date&sort_direction=desc` +
        `&name=${pageRequest.name ?? ''}&status=private&hl=de&page=${pageRequest.page - 1}&limit=${pageRequest.count}` +
        `&start_date=${pageRequest.startDate?.toISOString() ?? ''}&end_date=${pageRequest.endDate?.toISOString() ?? ''}`,
    'Basic',
    (pageRequest) => pageRequest.authString,
    async (response) => await response.json()
)

export const komootTourCoordinatesRequest = createAuthenticatedGetThunk<KomootTourCoordinatesDto, KomootTourRequestDto>(
    'komoot-tour-coordinates',
    (request) => `${ApiUrls.KomootApiUrl}/tours/${request.tourId}/coordinates`,
    'Basic',
    (request) => request.authString,
    async (response) => await response.json()
)

export const komootGpxTourRequest = createAuthenticatedGetThunk<string, KomootTourRequestDto>(
    'komoot-tour-coordinates',
    (request) => `${ApiUrls.KomootApiUrl}/tours/${request.tourId}.gpx`,
    'Basic',
    (request) => request.authString,
    async (response) => await response.text()
)
