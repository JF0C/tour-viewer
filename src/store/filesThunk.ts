import { createAsyncThunk } from "@reduxjs/toolkit";
import { FileUploadDto } from "../dtos/fileUploadDto";
import { ApiUrls } from "../constants/ApiUrls";
import http from 'axios';

export const uploadImage = createAsyncThunk('upload/file', async (fileUploadDto: FileUploadDto): Promise<string[]> => {
    const data = new FormData();
    data.append("file", fileUploadDto.file);

    let url = `${ApiUrls.BaseUrl + ApiUrls.ImageEndpoint}`;
    if (fileUploadDto.blogPostId !== undefined) {
        url += '/' + fileUploadDto.blogPostId;
    }
    
    const response = await http.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        onUploadProgress: fileUploadDto.onChunk
    });
    return response.data as string[];
});