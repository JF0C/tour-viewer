import { ApiUrls } from "../constants/ApiUrls";
import { createGetThunk } from "./thunkBase";

export const getAppVersion = createGetThunk<string, void>(
    'get-version',
    () => `${ApiUrls.BaseUrl + ApiUrls.VersionEndpoint}`,
    async (response) => await response.text()
)
