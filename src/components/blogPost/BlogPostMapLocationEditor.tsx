import { LatLng } from "leaflet";
import { FunctionComponent, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { Timeouts } from "../../constants/Timeouts";
import { coordinatesToLatLng, latLngToCoordinates } from "../../converters/coordinatesConverter";
import { trackClosestToPoint } from "../../converters/trackDataClosestToPoint";
import { changeEditingBlogpostPosition, changeEditingBlogpostTrack, setClickedEvent, setEditingBlogpost, setMapCenter, setMarkerPosition, setZoomLevel } from "../../store/blogPostStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";

export const BlogPostMapLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor));
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const tourTracks = useAppSelector((state) => state.tour.selectedTour?.tracks);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const markerPosition = useAppSelector((state) => state.blog.markerPosition);
    const clickedTime = useAppSelector((state) => state.blog.clickedEvent.time);
    const clickedLocation = useAppSelector((state) => state.blog.clickedEvent.location);
    const [dragging, setDragging] = useState(false);
    const barState = useAppSelector((state) => state.tour.dataSelectorBarState);

    const map = useMap();

    const dragEnd = (endposition: LatLng) => {
        dispatch(changeEditingBlogpostPosition({
            latitude: endposition.lat,
            longitude: endposition.lng
        }));
        dispatch(setMarkerPosition(latLngToCoordinates(endposition)));
        
        const fileId = trackClosestToPoint(selectedTracks, { latitude: endposition.lat, longitude: endposition.lng })?.fileReference ?? '';
        const trackId = tourTracks?.find(t => t.fileReference === fileId)?.id ?? 0;
        dispatch(changeEditingBlogpostTrack({trackId: trackId, trackFileReference: fileId}));
        setTimeout(() => setDragging(false), 50);
    }


    useMapEvents({
        move() {
            dispatch(setMapCenter(latLngToCoordinates(map.getCenter())));
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
            if (dragging) {
                return;
            }
            const timeDelta = (new Date().valueOf()) - clickedTime;
            if (timeDelta > Timeouts.CreateBlogPostHold && isContributor && clickedLocation) {
                dispatch(setMarkerPosition(clickedLocation));
                if (!isEditingBlogPost) {
                    const fileId = trackClosestToPoint(selectedTracks, clickedLocation)?.fileReference ?? '';
                    const trackId = tourTracks?.find(t => t.fileReference === fileId)?.id ?? 0;
                    dispatch(setEditingBlogpost({
                        id: 0,
                        latitude: clickedLocation.latitude,
                        longitude: clickedLocation.longitude,
                        title: '',
                        message: '',
                        images: [],
                        trackId: trackId,
                        trackFileReference: fileId
                    }))
                }
                else {
                    dispatch(changeEditingBlogpostPosition(clickedLocation));
                }
            }
            dispatch(setClickedEvent(undefined));
        }
    });

    if (isEditingBlogPost && markerPosition) {
        return <Marker eventHandlers={
            {
                dragstart() {
                    setDragging(true)
                },
                dragend(e) {
                    dragEnd(e.target._latlng)
                }
            }} icon={MarkerIcons.orange} draggable position={coordinatesToLatLng(markerPosition)}>

        </Marker>
    }
    return <></>
}

