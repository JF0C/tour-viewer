import { createAsyncThunk } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/pagedResult";
import { TourDto } from "../dtos/tourDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";
import { CreateTourDto } from "../dtos/createTourDto";
import { RenameTourDto } from "../dtos/renameTourDto";
import { ChangeTourStartDateDto } from "../dtos/changeTourStartDateDto";
import { ChangeParticipantDto } from "../dtos/changeParticipantDto";

export const searchTours = createAsyncThunk('search-tours',
    async (search: PageRequestDto): Promise<PagedResult<TourDto>> => {
        const url = `${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}` +
            `?page=${search.page}&number=${search.count}`;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        return response.json();
    }
);

export const createTourRequest = createAsyncThunk('create-tour',
    async (tour: CreateTourDto): Promise<number> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(tour)
        });

        return Number(response.text())
    }
)

export const loadTourRequest = createAsyncThunk('load-tour',
    async (tourId: number): Promise<TourDto> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${tourId}`, {
            method: 'GET',
            credentials: 'include'
        })

        return response.json();
    }
)

export const renameTourRequest = createAsyncThunk('rename-tour',
    async (rename: RenameTourDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${rename.tourId}/Name`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rename.name)
        });
    }
)

export const changeTourStartDateRequest = createAsyncThunk('change-tour-start-date',
    async (changeStartDate: ChangeTourStartDateDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${changeStartDate.tourId}/StartDate`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeStartDate.startDate)
        })
    }
)

export const addParticipantRequest = createAsyncThunk('add-participant',
    async (addParticipant: ChangeParticipantDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${addParticipant.tourId}/Participant`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addParticipant.participantId)
        });
    }
);

export const removeParticipantRequest = createAsyncThunk('add-participant',
    async (removeParticipant: ChangeParticipantDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TourEndpoint}/${removeParticipant.tourId}/Participant`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(removeParticipant.participantId)
        });
    }
);
