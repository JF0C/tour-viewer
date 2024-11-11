import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { CreateBlogPostDto } from "../../dtos/createBlogPostDto";
import { ConfirmModal } from "../shared/ConfirmModal";

export type BlogPostEditButtonsProps = {
    blogPost: CreateBlogPostDto;
    onSave: () => void;
    onDelete: () => void;
}

export const BlogPostEditButtons: FunctionComponent<BlogPostEditButtonsProps> = (props) => {

    return <>{
        props.blogPost.id === 0 ?
            <Button className="w-full" color='success' onClick={props.onSave}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                &nbsp;Save
            </Button>
            : <></>
    }
        {
            props.blogPost.id !== 0 ?
                <ConfirmModal message={`Do you really want to delete blog post ${props.blogPost.title}`}
                    onConfirm={props.onDelete} type='error' buttonContent={<>
                        <FontAwesomeIcon icon={faTrash} />
                        &nbsp;Delete
                    </>} />
                : <></>
        }
    </>
}