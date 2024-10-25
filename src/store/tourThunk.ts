import { createAsyncThunk } from "@reduxjs/toolkit";
import { PagedResult } from "../dtos/pagedResult";
import { TourDto } from "../dtos/tourDto";
import { PageRequestDto } from "../dtos/pageRequestDto";
import { ApiUrls } from "../constants/ApiUrls";

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
