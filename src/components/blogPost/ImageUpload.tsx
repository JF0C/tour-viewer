import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { AxiosProgressEvent } from "axios";
import { FunctionComponent, useRef } from "react";
import { addImageReferenceToEditingBlogpost } from "../../store/blogPostStateReducer";
import { deleteImageRequest, uploadImageRequest } from "../../store/filesThunk";
import { updateEditingBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { ImageSwipeContainer } from "./ImageSwipeContainer";

export const ImageUpload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector((state) => state.blog.editingBlogPost?.images) ?? [];
    const blogPostId = useAppSelector((state) => state.blog.editingBlogPost?.id);
    const tourId = useAppSelector((state) => state.tour.selectedTour?.id);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onProgress = (progress: AxiosProgressEvent) => {
        console.log(progress);
    }
    const upload = async () => {
        const files = fileInputRef?.current?.files;
        if (files) {
            const file = files[0];
            var targetBlogPostId = blogPostId;
            if (targetBlogPostId === 0) {
                targetBlogPostId = undefined;
            }
            dispatch(uploadImageRequest({ file: file, blogPostId: targetBlogPostId, onChunk: onProgress }))
                .unwrap()
                .then((response) => {
                    dispatch(addImageReferenceToEditingBlogpost(response));
                    if (tourId || tourId === 0) {
                        dispatch(loadTourRequest(tourId))
                            .unwrap()
                            .then((tour) => {
                                if (blogPostId) {
                                    updateEditingBlogpost(dispatch, tour, blogPostId);
                                }
                            })
                    }
                });
        }
    }

    const deleteImage = (imageId: string) => {
        dispatch(deleteImageRequest(imageId))
            .unwrap()
            .then(() => {
                if (tourId || tourId === 0) {
                    dispatch(loadTourRequest(tourId))
                    .unwrap()
                    .then((tour) => {
                        if (blogPostId) {
                            updateEditingBlogpost(dispatch, tour, blogPostId);
                        }
                    })
                }
            })
    }

    return <div>
        <ImageSwipeContainer images={images} onDelete={deleteImage} />
        <input ref={fileInputRef} onChange={() => upload()}
            className="hidden" type="file" name="data" accept="image/jpeg" />
        <Button onClick={() => fileInputRef.current?.click()}>
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add Image
        </Button>
    </div>
}