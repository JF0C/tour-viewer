import { ApiUrls } from "../constants/ApiUrls";
import { BlogPostDto } from "../dtos/blogPostDto";
import { BlogpostPageRequestDto } from "../dtos/blogPostPageRequestDto";
import { ChangeBlogPostLocationDto } from "../dtos/changeBlogPostLocationDto";
import { ChangeBlogPostMessageDto } from "../dtos/changeBlogPostMessageDto";
import { ChangeBlogPostTitleDto } from "../dtos/changeBlogPostTitleDto";
import { ChangeBlogPostTrackDto } from "../dtos/changeBlogPostTrackDto";
import { CreateBlogPostDto } from "../dtos/createBlogPostDto";
import { PagedResult } from "../dtos/pagedResult";
import { createDeleteThunk, createGetThunk, createPostThunk, createPutThunk } from "./thunkBase";

export const blogpostRequestToUrl = (request: BlogpostPageRequestDto) => {
    var requestUrl = `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}` +
        `?page=${request.page}&number=${request.count}`;
    if (request.author || request.author === 0) {
        requestUrl += `&author=${request.author}`;
    }
    if (request.title) {
        requestUrl += `&title=${request.title}`;
    }
    if (request.tourId || request.tourId === 0) {
        requestUrl += `&tourId=${request.tourId}`;
    }
    if (request.tourName) {
        requestUrl += `&tourName=${request.tourName}`;
    }
    return requestUrl;
}

export const loadBlogPostDetailRequest = createGetThunk<BlogPostDto, number>(
    'get-blogpost',
    (blogPostId) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${blogPostId}`,
    async (response) => await response.json()
)

export const createBlogPostRequest = createPostThunk<number, CreateBlogPostDto>(
    'create-blogpost',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}`,
    async (response) => Number(await response.text())
);

export const changeBlogPostTitleRequest = createPutThunk< ChangeBlogPostTitleDto>(
    'change-blogpost-title',
    (changeTitle) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeTitle.id}/Title`,
    (changeTitle) => JSON.stringify(changeTitle.title)
);

export const changeBlogPostMessageRequest = createPutThunk<ChangeBlogPostMessageDto>(
    'change-blogpost-message',
    (changeMessage) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeMessage.id}/Message`,
    (changeMessage) => JSON.stringify(changeMessage.message)
);

export const changeBlogPostLocationRequest = createPutThunk<ChangeBlogPostLocationDto>(
    'change-blogpost-location',
    (changeLocation) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeLocation.id}/Location`,
    (changeLocation) => JSON.stringify(changeLocation.coordinates)
);

export const changeBlogPostTrackRequest = createPutThunk<ChangeBlogPostTrackDto>(
    'change-blogpost-track',
    (changeTrack) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeTrack.id}/Track`,
    (changeTrack) => JSON.stringify(changeTrack.trackId)
);

export const deleteBlogPostRequest = createDeleteThunk<number>(
    'delete-blogpost',
    (blogPostId) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${blogPostId}`
);

export const searchBlogPostRequest = createGetThunk<PagedResult<BlogPostDto>, BlogpostPageRequestDto>(
    'search-blogposts',
    blogpostRequestToUrl,
    async (response) => await response.json()
)

export const searchBlogPostsForUser = createGetThunk<PagedResult<BlogPostDto>, BlogpostPageRequestDto>(
    'search-blogposts-for-user',
    blogpostRequestToUrl,
    async (response) => await response.json()
)
