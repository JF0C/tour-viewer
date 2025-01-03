import { LatLng } from "leaflet";
import { FunctionComponent } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { coordinatesToLatLng, latLngToCoordinates } from "../../converters/coordinatesConverter";
import { setClickedEvent, setMapBounds, setMapCenter, setMarkerDragging, setZoomLevel } from "../../store/mapStateReducer";
import { checkBlogPostOpen, mapClickEnd, markerDragEnd } from "../../store/stateHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/viewStateReducer";
import { latLngToGeoBounds } from "../../converters/bounds";

export const BlogPostMapLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor) ?? false);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const openedBlogPost = useAppSelector((state) => state.blog.openedBlogPost);
    const isTourSelected = useAppSelector((state) => state.tour.selectedTour !== undefined);
    const mapState = useAppSelector((state) => state.map);
    const viewState = useAppSelector((state) => state.view);
    const barState = viewState.dataSelectorBarState;
    const isShowingTours = viewState.mapMode === 'tours';

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
            mapClickEnd(dispatch, mapState, selectedTracks, isTourSelected && isShowingTours, isContributor, isEditingBlogPost);
            checkBlogPostOpen(dispatch, openedBlogPost);
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
            }} icon={MarkerIcons.blogPostNew} draggable position={coordinatesToLatLng(mapState.markerPosition)}>

        </Marker>
    }
    return <></>
}

