import { LatLng } from "leaflet";
import { FunctionComponent } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { coordinatesToLatLng, latLngToCoordinates } from "../../converters/coordinatesConverter";
import { setClickedEvent, setMapBounds, setMapCenter, setMarkerDragging, setZoomLevel } from "../../store/mapStateReducer";
import { mapClickEnd, markerDragEnd } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";
import { latLngToGeoBounds } from "../../converters/bounds";

export const BlogPostMapLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor) ?? false);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const mapState = useAppSelector((state) => state.map);
    const barState = useAppSelector((state) => state.tour.dataSelectorBarState);

    const map = useMap();

    const dragEnd = (endposition: LatLng) => {
        markerDragEnd(dispatch, latLngToCoordinates(endposition), selectedTracks);
    }

    useMapEvents({
        moveend() {
            dispatch(setMapCenter(latLngToCoordinates(map.getCenter())));
            dispatch(setMapBounds(latLngToGeoBounds(map.getBounds())))
            if (barState !== 'small') {
                dispatch(setDataBarState('small'));
            }
        },
        mousedown(e: any) {
            try {
                if (e.originalEvent.originalTarget?.className?.includes('leaflet-container')) {
                    dispatch(setClickedEvent({
                        latitude: e.latlng.lat,
                        longitude: e.latlng.lng
                    }));
                }
            }
            catch(ex){

            }
        },
        zoom(e: any) {
            dispatch(setZoomLevel(e.target._zoom));
        },
        mouseup() {
            mapClickEnd(dispatch, mapState, selectedTracks, isContributor, isEditingBlogPost);
        }
    });

    if (isEditingBlogPost && mapState.markerPosition) {
        return <Marker eventHandlers={
            {
                dragstart() {
                    dispatch(setMarkerDragging(true))
                },
                dragend(e) {
                    dragEnd(e.target._latlng)
                }
            }} icon={MarkerIcons.postNew} draggable position={coordinatesToLatLng(mapState.markerPosition)}>

        </Marker>
    }
    return <></>
}

