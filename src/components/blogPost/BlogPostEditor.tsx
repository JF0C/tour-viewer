import { faFloppyDisk, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { changeEditingBlogpostMessage, changeEditingBlogpostTitle, setEditingBlogpost } from "../../store/blogPostStateReducer";
import { changeBlogPostMessageRequest, changeBlogPostTitleRequest, createBlogPostRequest } from "../../store/blogPostThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { EditableTextField } from "../shared/EditableTextField";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ImageUpload } from "../tourEditing/ImageUpload";
import { LocationEdit } from "./LocationEdit";

export const BlogPostEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.blog.loading);
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);
    const tourId = useAppSelector((state) => state.tour.selectedTour?.id);

    if (loading) {
        return <LoadingSpinner />
    }

    if (!blogPost) {
        return <></>
    }

    const submitBlogPost = () => {
        if (blogPost.id === 0) {
            dispatch(createBlogPostRequest(blogPost))
                .unwrap()
                .then(() => {
                    if (tourId !== undefined) {
                        dispatch(loadTourRequest(tourId));
                    }
                });
        }
    }

    const changeTitle = (title: string) => {
        dispatch(changeEditingBlogpostTitle(title));
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostTitleRequest({
                id: blogPost.id,
                title: title
            }));
        }
    }

    const changeMessage = (message: string) => {
        dispatch(changeEditingBlogpostMessage(message))
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostMessageRequest({
                id: blogPost.id,
                message: message
            }));
        }
    }

    return <div className="flex flex-col h-full">
        <div>
            <EditableNameLabel value={blogPost.title === '' ? 'New Blog Post' : blogPost.title}
                className="font-bold text-xl"
                minLength={0} maxLength={100} name='Blog Post Title' inputType='text'
                onApply={changeTitle}
            />
        </div>
        <div className="flex-1 py-2">
            <ImageUpload />
            <LocationEdit />
            <EditableTextField className="flex-none w-full" value={blogPost.message === '' ? '<no message>' : blogPost.message}
                rows={10} name='Blog Post Message' onApply={changeMessage} minLength={0} maxLength={1000} />
        </div>

        <div className="flex flex-row gap-2">
            {
                blogPost.id === 0 ?
                    <Button color='success' variant="outlined" onClick={submitBlogPost}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        &nbsp;Save
                    </Button>
                    : <></>
            }
            <Button color='error' variant="outlined" onClick={() => dispatch(setEditingBlogpost(undefined))}>
                <FontAwesomeIcon icon={faX} />
                &nbsp;Cancel
            </Button>
        </div>
    </div>
}