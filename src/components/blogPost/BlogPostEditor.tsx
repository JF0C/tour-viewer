import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { changeEditingBlogpostMessage, changeEditingBlogpostTitle, setEditingBlogpost } from "../../store/blogPostStateReducer";
import { changeBlogPostMessageRequest, changeBlogPostTitleRequest, createBlogPostRequest, deleteBlogPostRequest, loadBlogPostDetailRequest } from "../../store/blogPostThunk";
import { isAllowedToCreate, updateEditingBlogpost } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTourRequest } from "../../store/tourThunk";
import { ConfirmModal } from "../shared/ConfirmModal";
import { EditableNameLabel } from "../shared/EditableNameLabel";
import { EditableTextField } from "../shared/EditableTextField";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { BlogPostEditButtons } from "./BlogPostEditButtons";
import { BlogPostLocationEditor } from "./BlogPostLocationEditor";
import { BlogPostTrackSelector } from "./BlogPostTrackSelector";
import { ImageUpload } from "./ImageUpload";
import { InfobarMaxButton } from "../shared/InfobarMaxButton";
import { setMarkerPosition } from "../../store/mapStateReducer";
import { BlogPostLabelEditor } from "./BlogPostLabelEditor";

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
                trackFileReference: blogPost.trackFileReference,
                labels: blogPost.labels
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
            .unwrap()
            .then(() => dispatch(loadBlogPostDetailRequest(blogPost.id))
                .unwrap().then((b) => dispatch(setEditingBlogpost(b))));
        }
    }

    const changeMessage = (message: string) => {
        dispatch(changeEditingBlogpostMessage(message));
        if (blogPost.id !== 0) {
            dispatch(changeBlogPostMessageRequest({
                id: blogPost.id,
                message: message
            }))
            .unwrap()
            .then(() => dispatch(loadBlogPostDetailRequest(blogPost.id))
                .unwrap().then((b) => dispatch(setEditingBlogpost(b))));
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

    return <div className="flex flex-col h-full info-bar-content">
        <div className="p-2 flex flex-row title-bar items-center w-full bg-primary">
            <div className="flex-1">
                <EditableNameLabel value={blogPost.title === '' ? 'New Blog Post' : blogPost.title}
                    className="font-bold text-xl"
                    minLength={0} maxLength={100} name='Blog Post Title' inputType='text'
                    onApply={changeTitle}
                />

            </div>
            <InfobarMaxButton />
            {
                blogPost.id === 0 ?
                    <ConfirmModal message="Unsafed changes might get lost." type="error"
                        onConfirm={() => dispatch(setEditingBlogpost(undefined))}
                        buttonContent={<>
                            <FontAwesomeIcon icon={faX} />
                        </>} />
                    :
                    <Button style={{ minWidth: '20px' }} onClick={() => dispatch(setEditingBlogpost(undefined))}>
                        <FontAwesomeIcon icon={faX} />
                    </Button>
            }
        </div>
        <div className="p-2 flex-1 overflow-y-scroll">
            <ImageUpload />
            <BlogPostTrackSelector />
            <BlogPostLocationEditor />
            <BlogPostLabelEditor />
            <EditableTextField className="" value={blogPost.message === '' ? '<no message>' : blogPost.message}
                name='Blog Post Message' onApply={changeMessage} minLength={0} maxLength={1000} />

            <div className="flex md:hidden flex-row gap-2 justify-center">
                <BlogPostEditButtons blogPost={blogPost}
                    onSave={submitBlogPost}
                    onDelete={deleteBlogPost} />
            </div>
        </div>

        <div className="hidden md:flex flex-row gap-2 justify-center">
            <BlogPostEditButtons blogPost={blogPost}
                onSave={submitBlogPost}
                onDelete={deleteBlogPost} />
        </div>
    </div>
}