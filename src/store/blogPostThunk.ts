import { ApiUrls } from "../constants/ApiUrls";
import { BlogPostDto } from "../dtos/blogPost/blogPostDto";
import { BlogpostPageRequestDto } from "../dtos/blogPost/blogPostPageRequestDto";
import { ChangeBlogPostCountryDto } from "../dtos/blogPost/changeBlogPostCountryDto";
import { ChangeBlogPostLocationDto } from "../dtos/blogPost/changeBlogPostLocationDto";
import { ChangeBlogPostMessageDto } from "../dtos/blogPost/changeBlogPostMessageDto";
import { ChangeBlogPostTitleDto } from "../dtos/blogPost/changeBlogPostTitleDto";
import { ChangeBlogPostTrackDto } from "../dtos/blogPost/changeBlogPostTrackDto";
import { CreateBlogPostDto } from "../dtos/blogPost/createBlogPostDto";
import { PagedResult } from "../dtos/shared/pagedResult";
import { setDateNumbers } from "./stateHelpers";
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
    if (request.tour || request.tour === 0) {
        requestUrl += `&tour=${request.tour}`;
    }
    if (request.bounds) {
        requestUrl += `&bounds={"north":${request.bounds.north},"south":${request.bounds.south},"west":${request.bounds.west},"east":${request.bounds.east}}`;
    }
    if (request.labels && request.labels.length > 0) {
        requestUrl += `&labels=${JSON.stringify(request.labels)}`;
    }
    if (request.countries) {
        requestUrl += `&countries=${JSON.stringify(request.countries)}`;
    }
    if (request.fromDate) {
        requestUrl += `&after=${request.fromDate}`;
    }
    if (request.toDate) {
        requestUrl += `&before=${request.toDate}`;
    }
    return requestUrl;
}

export const loadBlogPostDetailRequest = createGetThunk<BlogPostDto, number>(
    'get-blogpost',
    (blogPostId) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${blogPostId}`,
    async (response) => {
        const blogPost = await response.json();
        blogPost.tourTime = new Date(blogPost.tourTime).valueOf();
        for (let c of blogPost.comments ?? []) {
            setDateNumbers(c);
        }
        setDateNumbers(blogPost);
        return blogPost;
    }
);

export const createBlogPostRequest = createPostThunk<number, CreateBlogPostDto>(
    'create-blogpost',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}`,
    async (response) => Number(await response.text())
);

export const changeBlogPostTitleRequest = createPutThunk<ChangeBlogPostTitleDto>(
    'change-blogpost-title',
    (changeTitle) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeTitle.id}/Title`,
    (changeTitle) => JSON.stringify(changeTitle.title)
);

export const changeBlogPostMessageRequest = createPutThunk<ChangeBlogPostMessageDto>(
    'change-blogpost-message',
    (changeMessage) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeMessage.id}/Message`,
    (changeMessage) => JSON.stringify(changeMessage.message)
);

export const changeBlogPostCountryRequest = createPutThunk<ChangeBlogPostCountryDto>(
    'change-blogpost-country',
    (changeCountry) => `${ApiUrls.BaseUrl + ApiUrls.BlogPostEndpoint}/${changeCountry.blogPostId}/Country`,
    (changeCountry) => JSON.stringify(changeCountry.countryId ?? null)
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
