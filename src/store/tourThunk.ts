import { ApiUrls } from "../constants/ApiUrls";
import { ChangeParticipantDto } from "../dtos/changeParticipantDto";
import { ChangeTourStartDateDto } from "../dtos/changeTourStartDateDto";
import { CreateTourDto } from "../dtos/createTourDto";
import { PagedResult } from "../dtos/pagedResult";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { RenameTourDto } from "../dtos/renameTourDto";
import { TourDto } from "../dtos/tourDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const searchTours = createGetThunk<PagedResult<TourDto>, PageRequestDto>(
    'search-tours',
    (searchRequest) => `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}` +
        `?page=${searchRequest.page}&number=${searchRequest.count}`,
    (async (response) => {
        return await response.json();
    })
);

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
