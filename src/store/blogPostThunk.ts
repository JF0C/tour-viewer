import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrls } from "../constants/ApiUrls";
import { CreateBlogPostDto } from "../dtos/createBlogPostDto";
import { ChangeBlogPostTitleDto } from "../dtos/changeBlogPostTitleDto";
import { ChangeBlogPostMessageDto } from "../dtos/changeBlogPostMessageDto";
import { ChangeBlogPostLocationDto } from "../dtos/changeBlogPostLocationDto";
import { ChangeBlogPostTrackDto } from "../dtos/changeBlogPostTrackDto";

export const createBlogPostRequest = createAsyncThunk('create-blogpost',
    async (blogpost: CreateBlogPostDto): Promise<number> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(blogpost)
        });
        return Number(await response.text());
    }
)

export const changeBlogPostTitleRequest = createAsyncThunk('change-blogpost-title',
    async (changeTitle: ChangeBlogPostTitleDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeTitle.id}/Title`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(changeTitle.title)
        })
    }
)

export const changeBlogPostMessageRequest = createAsyncThunk('change-blogpost-message',
    async (changeMessage: ChangeBlogPostMessageDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeMessage.id}/Message`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(changeMessage.message)
        });
    }
)

export const changeBlogPostLocationRequest = createAsyncThunk('change-blogpost-location',
    async (changeLocation: ChangeBlogPostLocationDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeLocation.id}/Location`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(changeLocation.coordinates)
        })
    }
)

export const changeBlogPostTrackRequest = createAsyncThunk('change-blogpost-track',
    async (changeTrack: ChangeBlogPostTrackDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeTrack.id}/Track`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(changeTrack.trackId)
        })
    }
)

export const deleteBlogPostRequest = createAsyncThunk('delete-blogpost',
    async (blogPostId: number): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${blogPostId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }
)
