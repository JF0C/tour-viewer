import { FunctionComponent } from "react";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { Marker, Popup } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { TrackEntity } from "../../data/trackEntity";
import { useAppDispatch } from "../../store/store";
import { setOpenedBlogPost } from "../../store/blogPostStateReducer";

export type TrackLimitMarkerProps = {
    coordinates: CoordinatesDto
    label: string
    track: TrackEntity
}

export const TrackLimitMarker: FunctionComponent<TrackLimitMarkerProps> = (props) => {
    const dispatch = useAppDispatch();

    const markerClicked = () => {
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

    return <Marker icon={MarkerIcons.blue} eventHandlers={{click: markerClicked}}
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