import { faFloppyDisk, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { changeEditingBlogpostMessage, changeEditingBlogpostTitle, setEditingBlogpost, setMarkerPosition } from "../../store/blogPostStateReducer";
import { changeBlogPostMessageRequest, changeBlogPostTitleRequest, createBlogPostRequest, deleteBlogPostRequest } from "../../store/blogPostThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { EditableTextField } from "../shared/EditableTextField";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ImageUpload } from "./ImageUpload";
import { BlogPostLocationEditor } from "./BlogPostLocationEditor";
import { ConfirmModal } from "../shared/ConfirmModal";
import { isAllowedToCreate, updateEditingBlogpost } from "../../store/stateHelpers";
import { BlogPostTrackSelector } from "./BlogPostTrackSelector";

export const BlogPostEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.blog.loading);
    const blogPost = useAppSelector((state) => state.blog.editingBlogPost);
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const canEdit = useAppSelector((state) => isAllowedToCreate(state));

    if (loading) {
        return <LoadingSpinner />
    }

    if (!blogPost || !canEdit) {
        return <></>
    }

    const submitBlogPost = () => {
        if (blogPost.id === 0) {
            dispatch(createBlogPostRequest({
                id: 0,
                title: blogPost.title,
                message: blogPost.message,
                latitude: blogPost.longitude,
                longitude: blogPost.latitude,
                images: blogPost.images,
                trackId: blogPost.trackId,
                trackFileReference: blogPost.trackFileReference
            }))
                .unwrap()
                .then((blogPostId) => {
                    dispatch(setMarkerPosition());
                    if (tour?.id !== undefined) {
                        dispatch(loadTourRequest(tour.id))
                            .unwrap()
                            .then(tour => {
                                updateEditingBlogpost(dispatch, tour, blogPostId);
                            })
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
            }))
        }
    }

    const changeMessage = (message: string) => {
        dispatch(changeEditingBlogpostMessage(message));
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostMessageRequest({
                id: blogPost.id,
                message: message
            }));
        }
    }

    const deleteBlogPost = () => {
        dispatch(setMarkerPosition());
        dispatch(deleteBlogPostRequest(blogPost.id))
            .unwrap()
            .then(() => {
                if (tour?.id) {
                    dispatch(loadTourRequest(tour.id));
                    dispatch(setEditingBlogpost())
                }
            });
    }

    return <div className="flex flex-col h-full">
        <div className="flex flex-row">
            <div className="flex-1">
                <EditableNameLabel value={blogPost.title === '' ? 'New Blog Post' : blogPost.title}
                    className="font-bold text-xl"
                    minLength={0} maxLength={100} name='Blog Post Title' inputType='text'
                    onApply={changeTitle}
                />

            </div>
            {
                blogPost.id === 0 ?
                    <ConfirmModal message="Unsafed changes might get lost." type="error"
                    onConfirm={() => dispatch(setEditingBlogpost(undefined))}
                    buttonContent={<>
                        <FontAwesomeIcon icon={faX} />
                    </>}/>
                    :
                    <Button onClick={() => dispatch(setEditingBlogpost(undefined))}>
                        <FontAwesomeIcon icon={faX} />
                    </Button>
            }
        </div>
        <div className="flex-1 py-2">
            <ImageUpload />
            <BlogPostTrackSelector />
            <BlogPostLocationEditor />
            <EditableTextField className="flex-none w-full" value={blogPost.message === '' ? '<no message>' : blogPost.message}
                rows={10} name='Blog Post Message' onApply={changeMessage} minLength={0} maxLength={1000} />
        </div>

        <div className="flex flex-row gap-2 justify-center">
            {
                blogPost.id === 0 ?
                    <Button className="w-full" color='success' onClick={submitBlogPost}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        &nbsp;Save
                    </Button>
                    : <></>
            }
            {
                blogPost.id !== 0 ?
                    <ConfirmModal message={`Do you really want to delete blog post ${blogPost.title}`}
                        onConfirm={deleteBlogPost} type='error' buttonContent={<>
                            <FontAwesomeIcon icon={faTrash} />
                            &nbsp;Delete
                        </>} />
                    : <></>
            }
        </div>
    </div>
}