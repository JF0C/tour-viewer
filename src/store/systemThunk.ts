import { ApiUrls } from "../constants/ApiUrls";
import { CountryDto } from "../dtos/shared/countryDto";
import { createGetThunk } from "./thunkBase";

export const getAppVersion = createGetThunk<string, void>(
    'get-version',
    () => `${ApiUrls.BaseUrl + ApiUrls.VersionEndpoint}`,
    async (response) => await response.text()
)

export const cleanupImagesAndTracks = createGetThunk<string[], boolean>(
    'cleanup-images-tracks',
    (dryRun) => `${ApiUrls.BaseUrl + ApiUrls.CleanupEndpoint}?dryRun=${dryRun ? 'true' : 'false'}`,
    async (response) => await response.json()
)

export const loadCountriesRequest = createGetThunk<CountryDto[], void>(
    'load-countries',
    () => `${ApiUrls.BaseUrl + ApiUrls.CountryEndpoint}`,
    async (response) => await response.json()
)

export const tourDataJobRequest = createGetThunk<void, void>(
    'tour-data-job',
    () => `${ApiUrls.BaseUrl + ApiUrls.TourDataJobEndpoint}`,
    async () => {}
)

export const blogPostDataJobRequest = createGetThunk<void, void>(
    'blogpost-data-job',
    () => `${ApiUrls.BaseUrl + ApiUrls.BlogPostDataJobEndpoint}`,
    async () => {}
)

export const countryInUseJobRequest = createGetThunk<void, void>(
    'country-in-use-job',
    () => `${ApiUrls.BaseUrl + ApiUrls.CountryInUseJobEndpoint}`,
    async () => {}
)

export const blogPostsWithoutTimeRequest = createGetThunk<number[], void>(
    'blog-posts-without-time',
    () => `${ApiUrls.BaseUrl}/BlogPost/BlogPostsWithoutTime`,
    async (response) => await response.json()
)

export const toursWithoutCountry = createGetThunk<number[], void>(
    'tours-without-country',
    () => `${ApiUrls.BaseUrl}/Tour/ToursWithoutCountry`,
    async (response) => await response.json()
)
