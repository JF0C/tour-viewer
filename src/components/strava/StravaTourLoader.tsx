import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiUrls } from "../../constants/ApiUrls";
import { Roles } from "../../constants/Rolenames";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { stravaClientIdRequest, stravaTokenRequest } from "../../store/stravaThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { loadLoggedInUser } from "../../store/userThunk";
import { StravaActivityList } from "./StravaActivityList";

export const StravaTourLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const isContributor = authState.user?.roles.includes(Roles.Contributor) ?? false;
    const stravaState = useAppSelector((state) => state.strava);
    const [searchParams] = useSearchParams();

    if (!authState.user && !authState.fetchUserAttempted) {
        dispatch(loadLoggedInUser());
        return <div>reauthorization</div>
    }

    if (!isContributor) {
        return <div>unauthorized</div>
    }

    if (stravaState.loading) {
        return <LoadingSpinner />
    }

    if (!stravaState.clientId) {
        dispatch(stravaClientIdRequest());
        return <></>
    }

    if (!stravaState.tokenData) {
        if (searchParams.has('code') && !stravaState.authenticationFailed) {
            dispatch(stravaTokenRequest(searchParams.get('code')!))
                .then(() => searchParams.delete('code'));
            return <></>
        }
        else {
            const authorizationUrl = `${ApiUrls.StravaAuthorizationUrl}?client_id=${stravaState.clientId}` +
                `&redirect_uri=https://tourviewer.c11g.net/strava` +
                `&response_type=code` +
                `&scope=activity:read_all`
                // + `&approval_prompt=force`
            document.location.href = authorizationUrl;
        }
    }

    return <div>
        <div>{stravaState.tokenData?.accessToken}</div>
        <StravaActivityList/>
    </div>
}