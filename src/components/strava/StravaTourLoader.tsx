import { FunctionComponent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Roles } from "../../constants/Rolenames";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { stravaClientIdRequest, stravaTokenRequest } from "../../store/stravaThunk";
import { ApiUrls } from "../../constants/ApiUrls";

export const StravaTourLoader: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor)) ?? false;
    const stravaState = useAppSelector((state) => state.strava);
    const [searchParams] = useSearchParams();

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
        if (searchParams.has('code')) {
            dispatch(stravaTokenRequest(searchParams.get('code')!));
            return <></>
        }
        else {
            const authorizationUrl = `${ApiUrls.StravaAuthorizationUrl}?client_id=${stravaState.clientId}` +
                `&redirect_uri=https://tourviewer.c11g.net/strava` +
                `&response_type=code` +
                `&scope=activity:read_all`
                // + `&approval_prompt=force`
            navigate(authorizationUrl);
        }
    }

    return <div>

    </div>
}