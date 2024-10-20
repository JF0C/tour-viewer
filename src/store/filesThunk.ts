import { createAsyncThunk } from "@reduxjs/toolkit";
import { FileUploadDto } from "../dtos/fileUploadDto";
import { ApiUrls } from "../constants/ApiUrls";
import http from 'axios';

export const uploadFile = createAsyncThunk('upload/file', async (fileUploadDto: FileUploadDto): Promise<string[]> => {
    const data = new FormData();
    data.append("file", fileUploadDto.file);

    let url = `${ApiUrls.BaseUrl + ApiUrls.ImageEndpoint}`;
    if (fileUploadDto.trackId !== undefined) {
        url += '/' + fileUploadDto.trackId;
    }
    console.log(url);
    const response = await http.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: fileUploadDto.onChunk
    });
    return response.data as string[];
});