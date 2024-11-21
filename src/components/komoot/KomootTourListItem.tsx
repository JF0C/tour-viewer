import { FunctionComponent, ReactNode } from "react";
import { millisToDateString } from "../../converters/dateConverters";
import { toggleSelectedKomootTour } from "../../store/komootStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Limits } from "../../constants/Limits";
import { enqueueSnackbar } from "notistack";
import { GpxTourDownload } from "../../data/gpxTourDownload";

export type KomootTourListItemProps = {
    tour: GpxTourDownload;
    children?: ReactNode;
}

export const KomootTourListItem: FunctionComponent<KomootTourListItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const selectedTours = useAppSelector((state) => state.komoot.toursToDownload);
    const isSelected = selectedTours.find(t => t.id === props.tour.id);

    const toggleSelected = () => {
        if (props.children) {
            return;
        }
        if (!isSelected && selectedTours.length >= Limits.MaxGpxFilesForDownload) {
            enqueueSnackbar(`You can download at most ${Limits.MaxGpxFilesForDownload} at once`,
                { variant: 'error' });
            return;
        }
        dispatch(toggleSelectedKomootTour({
            id: props.tour.id,
            name: props.tour.name,
            distance: props.tour.distance,
            previewImageUrl: props.tour.previewImageUrl,
            date: props.tour.date,
            state: 'ready'
        }));
    }

    return <div className="flex flex-col md:flex-row border border-white rounded-md" onClick={toggleSelected}>
        <div>
            <img width={100} src={props.tour.previewImageUrl} alt={`tour preview ${props.tour.id}`} />
        </div>
        <div className="flex flex-col p-2" style={{ backgroundColor: (isSelected && !props.children) ? 'green' : undefined }}>
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