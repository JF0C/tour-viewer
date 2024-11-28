import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiUrls } from "../../constants/ApiUrls";
import { Roles } from "../../constants/Rolenames";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { stravaClientIdRequest, stravaRefreshRequest, stravaTokenRequest } from "../../store/stravaThunk";
import { setEditingTour } from "../../store/tourStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { StravaActivityList } from "./StravaActivityList";
import { useCookies } from "react-cookie";
import { ExternalSources } from "../../constants/ExternalSources";

export const StravaTourLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies([ExternalSources.Strava])

    const authState = useAppSelector((state) => state.auth);
    const isContributor = authState.user?.roles.includes(Roles.Contributor) ?? false;
    const stravaState = useAppSelector((state) => state.strava);
    const editingTour = useAppSelector((state) => state.tour.editingTour);
    const [searchParams] = useSearchParams();

    if (editingTour.id === 0 && searchParams.has('state')) {
        const stateParam = Number(searchParams.get('state'));
        if (stateParam) {
            dispatch(loadTourRequest(Number(searchParams.get('state'))))
                .unwrap()
                .then((tour) => dispatch(setEditingTour(tour)));
        }
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

    const redirectToStravaAuthorization = () => {
        const authorizationUrl = `${ApiUrls.StravaAuthorizationUrl}?client_id=${stravaState.clientId}` +
            `&redirect_uri=https://tourviewer.c11g.net/strava` +
            `&response_type=code` +
            `&scope=activity:read_all` +
            `&state=${editingTour.id}`
        // + `&approval_prompt=force`
        document.location.href = authorizationUrl;
    }

    if (!stravaState.tokenData) {
        if (cookies.strava?.refreshToken) {
            dispatch(stravaRefreshRequest(cookies.strava.refreshToken))
                .unwrap()
                .then((tokenResponse) => {
                    setCookie(ExternalSources.Strava, { refreshToken: tokenResponse.refresh_token })
                })
                .catch(() => {
                    setCookie(ExternalSources.Strava, null);
                    redirectToStravaAuthorization();
                });
            return <></>
        }
        if (searchParams.has('code') && !stravaState.authenticationFailed) {
            dispatch(stravaTokenRequest(searchParams.get('code')!))
                .unwrap()
                .then((tokenResponse) => {
                    searchParams.delete('code');
                    setCookie(ExternalSources.Strava, { refreshToken: tokenResponse.refresh_token })
                });
            return <></>
        }
        else {
            redirectToStravaAuthorization();
        }
    }

    return <div>
        <StravaActivityList />
    </div>
}