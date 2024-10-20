import { AxiosProgressEvent } from "axios";

export type FileUploadDto = {
    file: File;
    trackId?: number;
    onChunk?: (progress: AxiosProgressEvent) => void
}