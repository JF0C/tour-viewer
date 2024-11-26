import { FunctionComponent } from "react";
import { BigFormLayout } from "../layout/BigFormLayout";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { StravaActivityListItem } from "./StravaActivityListItem";
import { ActivityDownloadContent } from "./ActivityDownloadContent";

export const StravaActivityDownload: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const toursToDownload = useAppSelector((state) => state.strava.toursToDownload);

    return <BigFormLayout>
        <div className="flex flex-row flex-wrap gap-2">
            {
                toursToDownload.map(t => 
                    <StravaActivityListItem tour={t}>
                        <ActivityDownloadContent tour={t}/>
                    </StravaActivityListItem>
                )
            }
        </div>
    </BigFormLayout>
}