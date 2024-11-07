import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiUrls } from "../constants/ApiUrls"
import { parseGpxText } from "../converters/trackDataParser"
import { ChangeTrackNameDto } from "../dtos/changeTrackNameDto"
import { ChangeTrackPositionDto } from "../dtos/changeTrackPositionDto"
import { EditTrackDto } from "../dtos/editTrackDto"
import { createDeleteThunk, createPostThunk, createPutThunk } from "./thunkBase"
import { ITrackEntity } from "./trackStateReducer"
import { enqueueSnackbar } from "notistack"

export const deleteTrackRequest = createDeleteThunk<number>(
    'delete-track',
    (trackId) => `${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${trackId}`
);

export const createTrackRequest = createPostThunk<number, EditTrackDto>(
    'create-track',
    () => `${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}`,
    async (response) => Number(await response.text())
);

export const loadTrackRequest = createAsyncThunk('load-track',
    async (fileReference: string): Promise<ITrackEntity> => {
        const response = await fetch(`${ApiUrls.BaseUrl}/trk/${fileReference}.gpx`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/xml'
            }
        });

        if (!response.ok) {
            enqueueSnackbar(`error loading track: ${fileReference}`, { variant: 'error' });
            return {
                fileReference: fileReference,
                selected: true,
                loading: false,
                data: {
                    name: 'failed to load',
                    elevation: {
                        average: 0,
                        maximum: 0,
                        minimum: 0,
                        positive: 0,
                        negative: 0
                    },
                    distance: 1,
                    totalTime: 1,
                    totalMovementTime: 1,
                    points: []
                }
            }
        }

        return {
            fileReference: fileReference,
            selected: true,
            loading: false,
            data: parseGpxText(await response.text())
        };
    }
);

export const changeTrackNameRequest = createPutThunk<ChangeTrackNameDto>(
    'change-track-name',
    (changeName) => `${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${changeName.trackId}/Name`,
    (changeName) => JSON.stringify(changeName.name)
);

export const changeTrackPositionRequest = createPutThunk<ChangeTrackPositionDto>(
    'change-track-position',
    (changePosition) => `${ApiUrls.BaseUrl + ApiUrls.TrackEndpoint}/${changePosition.trackId}/Position`,
    (changePosition) => JSON.stringify(changePosition.position)
);
