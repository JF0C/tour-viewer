import { ApiUrls } from "../constants/ApiUrls";
import { CreateCommentDto } from "../dtos/createCommentDto";
import { DeleteCommentDto } from "../dtos/deleteCommentDto";
import { EditCommentDto } from "../dtos/editCommentDto";
import { createDeleteThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const createCommentRequest = createPostThunk<number, CreateCommentDto>(
    'create-comment',
    (comment) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${comment.blogPostId}/Comment`,
    async (response) => Number(await response.text()),
    (comment) => JSON.stringify(comment.content)
)

export const deleteCommentRequest = createDeleteThunk<DeleteCommentDto>(
    'delete-comment',
    (deleteRequest) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/` +
        `${deleteRequest.blogPostId}/Comment/${deleteRequest.commentId}`
)

export const editCommentRequest = createPutThunk<EditCommentDto>(
    'edit-comment',
    (editRequest) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/` +
        `${editRequest.blogPostId}/Comment/${editRequest.commentId}`,
    (editRequest) => JSON.stringify(editRequest.content)
)
