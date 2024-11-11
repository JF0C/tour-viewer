import { FunctionComponent } from "react";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { setSelectedBlogpost } from "../../store/blogPostStateReducer";
import { ImageSwipeContainer } from "./ImageSwipeContainer";
import { Participant } from "../tourEditing/Participant";

export type BlogPostDetailsProps = {
    blogPost: BlogPostDto
}

export const BlogPostDetails: FunctionComponent<BlogPostDetailsProps> = (props) => {
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(setSelectedBlogpost(undefined));
    }

    return <div className="info-bar-drawer flex flex-col">
        <div className="flex flex-row justify-between">
            <div className="font-bold">
                {props.blogPost.title}
            </div>
            <Button onClick={close}>
                <FontAwesomeIcon icon={faX} />
            </Button>
        </div>
        <div className="flex-1 overflow-y-scroll">
            <div className="flex flex-wrap pb-2">
                <Participant user={props.blogPost.author} linkToProfile canRemove={false} />
            </div>
            <div>
                {props.blogPost.message}
            </div>
            <div className="w-full flex flex-row justify-center">
                <div className="w-44 md:w-full">
                    <ImageSwipeContainer images={props.blogPost.images.map(i => i.imageId)} />
                </div>
            </div>
        </div>
    </div>
}