import { createAsyncThunk } from "@reduxjs/toolkit";
import { FileUploadDto } from "../dtos/fileUploadDto";
import { ApiUrls } from "../constants/ApiUrls";
import http from 'axios';
import { createDeleteThunk } from "./thunkBase";

export const uploadImageRequest = createAsyncThunk('upload/file',
    async (fileUploadDto: FileUploadDto): Promise<string> => {
        const data = new FormData();
        data.append("file", fileUploadDto.file);

        let url = `${ApiUrls.BaseUrl + ApiUrls.ImageControlEndpoint}`;
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

        if (response.status > 299) {
            throw new Error(response.data.toString())
        }

        return response.data as string;
    }
);

export const deleteImageRequest = createDeleteThunk<string>(
    'delete-image',
    (imageId: string) => `${ApiUrls.BaseUrl + ApiUrls.ImageControlEndpoint}/${imageId}`
)
