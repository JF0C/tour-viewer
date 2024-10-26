import { createAsyncThunk } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/pagedResult";
import { TourDto } from "../dtos/tourDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";
import { CreateTourDto } from "../dtos/createTourDto";

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
