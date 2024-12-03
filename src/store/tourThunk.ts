import { ApiUrls } from "../constants/ApiUrls";
import { ChangeParticipantDto } from "../dtos/tour/changeParticipantDto";
import { ChangeTourStartDateDto } from "../dtos/tour/changeTourStartDateDto";
import { CreateTourDto } from "../dtos/tour/createTourDto";
import { PagedResult } from "../dtos/shared/pagedResult";
import { RenameTourDto } from "../dtos/tour/renameTourDto";
import { TourDto } from "../dtos/tour/tourDto";
import { TourPageRequestDto } from "../dtos/tour/tourPageRequestDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const tourRequestToUrl = (request: TourPageRequestDto) => {
    var requestUrl = `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}` +
        `?page=${request.page}&number=${request.count}`;
    if (request.year) {
        requestUrl += `&year=${request.year}`;
    }
    if (request.month || request.month === 0) {
        requestUrl += `&month=${request.month}`;
    }
    if (request.name) {
        requestUrl += `&name=${request.name}`;
    }
    if (request.participantId || request.participantId === 0) {
        requestUrl += `&participant=${request.participantId}`;
    }
    return requestUrl;
}

export const searchTours = createGetThunk<PagedResult<TourDto>, TourPageRequestDto>(
    'search-tours',
    tourRequestToUrl,
    async (response) => await response.json()
);

export const searchToursForUser = createGetThunk<PagedResult<TourDto>, TourPageRequestDto>(
    'search-tours-for-user',
    tourRequestToUrl,
    async (response) => await response.json()
)

export const createTourRequest = createPostThunk<Number, CreateTourDto>(
    'create-tour',
    () => ApiUrls.BaseUrl + ApiUrls.TourEndpoint, (async (response) => {
        return Number(await response.text())
    })
);

export const loadTourRequest = createGetThunk<TourDto, number>(
    'load-tour',
    (tourId: number) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${tourId}`,
    (response) => response.json()
);

export const renameTourRequest = createPutThunk<RenameTourDto>(
    'rename-tour',
    (rename) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${rename.tourId}/Name`,
    (rename) => JSON.stringify(rename.name)
)

export const changeTourStartDateRequest = createPutThunk<ChangeTourStartDateDto>(
    'change-tour-start-date',
    (changeStartDate) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${changeStartDate.tourId}/StartDate`,
    (changeStartDate) => JSON.stringify(changeStartDate.startDate)
);

export const addParticipantRequest = createPutThunk<ChangeParticipantDto>(
    'add-participant',
    (addParticipant) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${addParticipant.tourId}/Participant`,
    (addParticipant) => JSON.stringify(addParticipant.participantId)
);

export const removeParticipantRequest = createDeleteThunk<ChangeParticipantDto>(
    'remove-participant',
    (removeParticipant) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${removeParticipant.tourId}/Participant`,
    (removeParticipant) => JSON.stringify(removeParticipant.participantId)
);

export const deleteTourRequest = createDeleteThunk<number>(
    'delete-tour',
    (tourId) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${tourId}`
);

export const getDefaultTourId = createGetThunk<number, void>(
    'get-selected-tour-id',
    () => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/SelectedId`,
    async (response) => Number(await response.text())
)

export const setSelectedTourId = createPostThunk<number, number>(
    'set-selected-tour-id',
    (tourId) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/SelectedId/${tourId}`,
    async (response) => Number(await response.text())
)
