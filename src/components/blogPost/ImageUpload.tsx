import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { AxiosProgressEvent } from "axios";
import { FunctionComponent, useRef } from "react";
import { addImageReferenceToEditingBlogpost } from "../../store/blogPostStateReducer";
import { uploadImage } from "../../store/filesThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ImageSwipeContainer } from "./ImageSwipeContainer";

export const ImageUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.editingBlogPost?.images) ?? [];
    const blogPostId = useAppSelector((state) => state.blog.editingBlogPost?.id);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onProgress = (progress: AxiosProgressEvent) => {
        console.log(progress);
    }
    const upload = async () => {
        const files = fileInputRef?.current?.files;
        if (files) {
            const file = files[0];
            var  targetBlogPostId = blogPostId;
            if (targetBlogPostId === 0) {
                targetBlogPostId = undefined;
            }
            dispatch(uploadImage({ file: file, blogPostId: targetBlogPostId, onChunk: onProgress}))
                .unwrap()
                .then((response) => {
                    dispatch(addImageReferenceToEditingBlogpost(response));
            });
        }
    }


    return <div>
        <ImageSwipeContainer images={images}/>
        <input ref={fileInputRef} onChange={() => upload()}
            className="hidden" type="file" name="data" accept="image/jpeg" />
        <Button onClick={() => fileInputRef.current?.click()}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add Image
        </Button>
    </div>
}