import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { AxiosProgressEvent } from "axios";
import { FunctionComponent, useRef } from "react";
import { uploadImage } from "../../store/filesThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addImageReferenceToEditingBlogpost } from "../../store/blogPostStateReducer";
import { ApiUrls } from "../../constants/ApiUrls";

export const ImageUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.editingBlogPost?.images) ?? [];

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
                .then((response) => {
                    console.log(response);
                    dispatch(addImageReferenceToEditingBlogpost(response))
        })
        }
    }
    return <div>
        {
            images.map(i => <img key={i} width="100px" src={`${ApiUrls.BaseUrl}/img/${i}.jpg`} alt={i}/>)
        }
            
        <input ref={fileInputRef} onChange={() => upload()}
            className="hidden" type="file" name="data" accept="image/jpeg" />
        <Button onClick={() => fileInputRef.current?.click()}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add Image
        </Button>
    </div>
}