import { Button, Input } from "@mui/material";
import { FunctionComponent, useRef, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { uploadImage } from "../../store/filesThunk";
import { AxiosProgressEvent } from "axios";
import { ApiUrls } from "../../constants/ApiUrls";

export const ImageUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [imageFile, setImageFile] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onProgress = (progress: AxiosProgressEvent) => {
        console.log(progress);
    }
    const upload = async () => {
        const files = fileInputRef?.current?.files;
        if (files) {
            const file = files[0];
            console.log(file.name)
            dispatch(uploadImage({ file: file, onChunk: onProgress}))
                .unwrap()
                .then((response) => console.log(response))
        }
    }
    return <div>
        <Input placeholder="image guid" onChange={(e) => setImageFile(e.target.value)} />
        <img src={`${ApiUrls.BaseUrl + ApiUrls.ImageEndpoint}/${imageFile}.jpg`} 
            width='200px' alt="selected in input" />
        <input ref={fileInputRef} onChange={() => upload()}
            className="hidden" type="file" name="data" accept="image/jpeg" />
        <Button onClick={() => fileInputRef.current?.click()}>
            upload
        </Button>
    </div>
}