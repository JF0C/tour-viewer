import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiUrls } from "../constants/ApiUrls"
import { EditTrackDto } from "../dtos/editTrackDto"

export const deleteTrackRequest = createAsyncThunk('delete-track',
    async (trackId: number): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${trackId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }
)

export const createTrackRequest = createAsyncThunk('create-track', 
    async (track: EditTrackDto): Promise<number> => {
        const response = await fetch(`${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(track)
        })

        return Number(response.text())
    }
)