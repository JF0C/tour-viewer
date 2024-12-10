import { FunctionComponent, useState } from "react";
import { TourDto } from "../../dtos/tour/tourDto";
import { parseTourPreview } from "../../converters/trackPreviewParser";
import { Colors } from "../../constants/Colors";
import { PreviewTrackLine } from "./PreviewTrackLine";
import { Marker, useMap } from "react-leaflet";
import { useAppDispatch } from "../../store/store";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { setEditingBlogpost } from "../../store/blogPostStateReducer";
import { setSelectedTourId } from "../../store/tourStateReducer";
import { loadTourRequest } from "../../store/tourThunk";
import { clearTracks } from "../../store/trackStateReducer";
import { LatLngExpression } from "leaflet";

export type TourPreviewProps = {
    tour: TourDto,
    index: number
}

export const TourPreview: FunctionComponent<TourPreviewProps> = (props) => {
    const dispatch = useAppDispatch();
    const [markerCenter, setMarkerCenter] = useState<LatLngExpression>([0, 0]);
    const [eventHandlersSet, setEventHandlersSet] = useState(false);
    const tourTracks = parseTourPreview(props.tour);
    const map = useMap();

    const loadFullTour = () => {
        console.log('loading tour');
        dispatch(clearTracks());
        dispatch(setEditingBlogpost(undefined));
        dispatch(setSelectedTourId(props.tour.id));
        dispatch(loadTourRequest(props.tour.id));
    }

    const updateCenterMarker = () => {
        const mapBounds = map.getBounds();
        const south = mapBounds.getSouth();
        const north = mapBounds.getNorth();
        const west = mapBounds.getWest();
        const east = mapBounds.getEast();
        const visiblePoints = props.tour.previewTrack.filter(p =>
            p.latitude < north && p.latitude > south && p.longitude < east && p.longitude > west);
        const center = visiblePoints[Math.floor(visiblePoints.length / 2)]
        if (center) {
            setMarkerCenter([center.latitude, center.longitude]);
        }
    }

    if (!eventHandlersSet) {
        setEventHandlersSet(true);
        map.addEventListener('dragend', () => {
            updateCenterMarker();
        });
    
        map.addEventListener('zoomend', () => {
            updateCenterMarker();
        });
    }

    const color = Colors.colorCircle(props.index);
    
    return <>
        {
            tourTracks.map((t, i) => <PreviewTrackLine key={`tour-${props.index}-preview-${i}`} 
                color={color} track={t} />)
        }
        <Marker eventHandlers={{ click: loadFullTour }} icon={MarkerIcons.openTour} position={markerCenter}>
        </Marker>
    </>
}