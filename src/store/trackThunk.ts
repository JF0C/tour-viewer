import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiUrls } from "../constants/ApiUrls"
import { EditTrackDto } from "../dtos/editTrackDto"
import { ITrackEntity } from "./trackStateReducer"
import { parseGpxText } from "../converters/trackDataParser"
import { ChangeTrackNameDto } from "../dtos/changeTrackNameDto"
import { ChangeTrackPositionDto } from "../dtos/changeTrackPositionDto"

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

export const loadTrackRequest = createAsyncThunk('load-track',
    async (fileReference: string): Promise<ITrackEntity> => {
        try
        {
            const response = await fetch(`${ApiUrls.BaseUrl}/trk/${fileReference}.gpx`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/xml'
                }
            });
            return {
                fileReference: fileReference,
                selected: true,
                loading: false,
                data: parseGpxText(await response.text())
            };
        }
        catch(e) {
            return {
                fileReference: fileReference,
                selected: false,
                loading: false,
                data: {
                    name: `Failed to load ${fileReference}`,
                    points: [],
                    totalTime: 1,
                    totalMovementTime: 1,
                    elevation: {
                        positive: 0,
                        negative: 0,
                        average: 0,
                        minimum: 0,
                        maximum: 0
                    },
                    distance: 0
                }
            }
        }
    }
);

export const changeTrackNameRequest = createAsyncThunk('change-track-name',
    async (changeName: ChangeTrackNameDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${changeName.trackId}/Name`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeName.name)
        });
    }
);

export const changeTrackPositionRequest = createAsyncThunk('change-track-position',
    async (changeName: ChangeTrackPositionDto): Promise<void> => {
        await fetch(`${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${changeName.trackId}/Position`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeName.position)
        });
    }
);
