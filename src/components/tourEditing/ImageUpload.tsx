import { Button } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { uploadFile } from "../../store/filesThunk";
import { AxiosProgressEvent } from "axios";

export const ImageUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onProgress = (progress: AxiosProgressEvent) => {
        console.log(progress);
    }
    const upload = async () => {
        const files = fileInputRef?.current?.files;
        if (files) {
            const file = files[0];
            dispatch(uploadFile({ file: file, trackId: 1, onChunk: onProgress}))
        }
    }
    return <div>
        <input ref={fileInputRef} onChange={() => upload()}
            className="hidden" type="file" name="data" accept="image/jpeg" />
        <Button onClick={() => fileInputRef.current?.click()}>
            upload
        </Button>
    </div>
}