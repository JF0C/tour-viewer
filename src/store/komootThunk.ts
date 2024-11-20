import { ApiUrls } from "../constants/ApiUrls";
import { KomootLoginResponseDto } from "../dtos/komootLoginResponseDto";
import { KomootPageRequestDto } from "../dtos/komootPageRequestDto";
import { KomootTourResponseDto } from "../dtos/komootTourResponseDto";
import { LoginDto } from "../dtos/loginDto";
import { basicAuthorization, createAuthenticatedGetThunk } from "./thunkBase";

export const komootLoginRequest = createAuthenticatedGetThunk<KomootLoginResponseDto, LoginDto>(
    'komoot-login',
    (login) => `${ApiUrls.KomootLoginUrl}/${login.email}/`,
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
        `&name=&status=private&hl=de&page=${pageRequest.page}&limit=${pageRequest.count}`,
    (pageRequest) => pageRequest.authString,
    async (response) => {
        const result = await response.json();
        console.log(result);
        return result;
    }
)
