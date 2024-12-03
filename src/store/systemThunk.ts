import { ApiUrls } from "../constants/ApiUrls";
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
