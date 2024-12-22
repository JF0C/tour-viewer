import { FunctionComponent } from "react";
import { useMap } from "react-leaflet";
import { setClickedEvent } from "../../store/mapStateReducer";
import { setReleasePosition, setTapPosition } from "../../store/mapStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { mapClickEnd, markerDragEnd } from "../../store/stateHelpers";
import { Roles } from "../../constants/Rolenames";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";

export const LongTapMapLocationConverter: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const mapState = useAppSelector((state) => state.map);
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor) ?? false);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const isTourSelected = useAppSelector((state) => state.tour.selectedTour !== undefined);
    const isShowingTours = useAppSelector((state) => state.view.mapMode === 'tours');

    const map = useMap();

    const tapPositionToCoordinates = (screenPosition: {x: number, y: number}): CoordinatesDto => {
        const bounds = map.getBounds();
        const latRatio = screenPosition.y / (window.innerHeight - 52);
        const lat = (1-latRatio) * bounds.getNorth() + latRatio * bounds.getSouth();
        const lngRatio = screenPosition.x / window.innerWidth;
        const lng = (1-lngRatio) * bounds.getWest() + lngRatio * bounds.getEast();
        return {
            latitude: lat,
            longitude: lng
        };
    }

    if (mapState.tapPosition) {
        const coordinates = tapPositionToCoordinates(mapState.tapPosition);
        dispatch(setTapPosition());
        dispatch(setClickedEvent(coordinates));
    }

    if (mapState.releasePosition) {
        mapClickEnd(dispatch, mapState, selectedTracks, isTourSelected && isShowingTours, isContributor, isEditingBlogPost);
        if (mapState.isDraggingMarker) {
            const coordinates = tapPositionToCoordinates(mapState.releasePosition)
            markerDragEnd(dispatch, coordinates, selectedTracks);
        }
        dispatch(setReleasePosition());
        dispatch(setClickedEvent());
    }
    return <></>
}