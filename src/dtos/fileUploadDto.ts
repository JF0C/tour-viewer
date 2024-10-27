import { AxiosProgressEvent } from "axios";

export type FileUploadDto = {
    file: File;
    blogPostId?: number;
    onChunk?: (progress: AxiosProgressEvent) => void
}