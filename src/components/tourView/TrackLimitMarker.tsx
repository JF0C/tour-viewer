import { FunctionComponent, useRef, useState } from "react";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { Marker, Popup, useMap } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { TrackEntity } from "../../data/trackEntity";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setOpenedBlogPost } from "../../store/blogPostStateReducer";
import { selectMarkerReference } from "../../store/trackStateReducer";
import { Timeouts } from "../../constants/Timeouts";
import { setMarkerReferenceId } from "../../store/mapStateReducer";

export type TrackLimitMarkerProps = {
    id: number
    coordinates: CoordinatesDto
    label: string
    track: TrackEntity
}

export const TrackLimitMarker: FunctionComponent<TrackLimitMarkerProps> = (props) => {
    const dispatch = useAppDispatch();
    const selectedMapMarker = useAppSelector((state) => state.map.markerReferenceId);
    const selectedTrackMarker = useAppSelector((state) => state.track.markerReferences.find(x => x.selected));
    const [popupOpen, setPopupOpen] = useState(selectedTrackMarker?.id === props.id 
        && selectedTrackMarker.type === 'limitMarker');

    const markerRef = useRef<any>(null);

    const markerClicked = () => {
        dispatch(selectMarkerReference({
            id: props.id,
            type: 'limitMarker'
        }));
        dispatch(setOpenedBlogPost({
            id: 0,
            created: 0,
            coordinates: props.coordinates,
            title: props.label,
            track: {
                id: props.track.id,
                tourPosition: props.track.tourPosition,
                created: 0,
                name: props.track.data.name,
                fileReference: props.track.fileReference,
                blogPosts: [],
            },
            message: '',
            images: [],
            author: null!,
            tourTime: 0,
            country: null!,
            comments: [],
            labels: []
        }))
    }

    if (selectedMapMarker?.id === props.id
        && selectedMapMarker.type === 'limitMarker'
        && markerRef?.current) {
        dispatch(setMarkerReferenceId());
        markerClicked();
    }

    if (selectedTrackMarker && markerRef?.current) {
        const shouldBeOpen = selectedTrackMarker.id === props.id
            && selectedTrackMarker.type === 'limitMarker';

        // if (shouldBeOpen && !popupOpen) {
        //     setPopupOpen(true);
        //     markerRef.current.openPopup();
        // }
        if (!shouldBeOpen && popupOpen) {
            setPopupOpen(false);
            markerRef.current.closePopup();
        }
    }

    return <Marker ref={markerRef} icon={MarkerIcons.blue} eventHandlers={{ click: markerClicked }}
        position={[props.coordinates.latitude, props.coordinates.longitude]}>
        <Popup>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">
                    {props.label}
                </div>
            </div>
        </Popup>
    </Marker>
}