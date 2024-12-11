import { ApiUrls } from "../constants/ApiUrls";
import { ChangeBlogPostLabelDto } from "../dtos/blogPost/changeBlogPostLabelDto";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const loadBlogPostLabelsRequest = createGetThunk<string[], void>(
    'load-blogpost-labels',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostLabelEndpoint}`,
    async (response) => await response.json()
)

export const createLabelRequest = createPostThunk<void, string>(
    'create-blogpost-label',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostLabelEndpoint}`,
    async () => {}
)

export const deleteLabelRequest = createDeleteThunk<string>(
    'delete-blogpost-label',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostLabelEndpoint}`
)

export const addLabelToBlogPostRequest = createPutThunk<ChangeBlogPostLabelDto>(
    'add-label-to-blogpost',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${request.blogPostId}/Label/${request.label}`
)

export const removeLabelFromBlogPostRequest = createDeleteThunk<ChangeBlogPostLabelDto>(
    'remove-label-from-blogpost',
    (request) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${request.blogPostId}/Label/${request.label}`
)
