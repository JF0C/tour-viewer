import { FunctionComponent, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { GpxTourDownload } from "../../data/gpxTourDownload";
import { millisToDateString } from "../../converters/dateConverters";
import { enqueueSnackbar } from "notistack";
import { Limits } from "../../constants/Limits";
import { addTourToDownload, removeTourToDownload } from "../../store/stravaStateReducer";

export type StravaActivityListItemProps = {
    children?: ReactNode;
    tour: GpxTourDownload;
}

export const StravaActivityListItem: FunctionComponent<StravaActivityListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const toursToDownload = useAppSelector((state) => state.strava.toursToDownload);
    const isSelected = Boolean(toursToDownload.find(t => t.id === props.tour.id));

    const toggleTourToDownload = () => {
        if (props.children) {
            return;
        }
        if (!isSelected && toursToDownload.length >= Limits.MaxGpxFilesForDownload) {
            enqueueSnackbar(`You can download at most ${Limits.MaxGpxFilesForDownload} at once`,
                { variant: 'error' });
            return;
        }
        if (isSelected) {
            dispatch(removeTourToDownload(props.tour.id));
        }
        else {
            dispatch(addTourToDownload(props.tour));
        }
    }
    

    return <div className="flex flex-col md:flex-row border border-white rounded-md cursor-pointer"
        onClick={toggleTourToDownload}>
        <div>

        </div>
        <div className="flex flex-col p-2 rounded-b-md md:rounded-r-md" style={{ backgroundColor: (isSelected && !props.children) ? 'green' : undefined }}>
            {
                props.children ? props.children :
                    <>
                        <div>
                            {props.tour.name}
                        </div>
                        <div>
                            {`${(props.tour.distance / 1000).toFixed(2)} km`}
                        </div>
                        <div>
                            {millisToDateString(props.tour.date)}
                        </div>
                    </>
            }
        </div>
    </div>
}