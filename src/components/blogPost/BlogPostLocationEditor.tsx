import { LatLng } from "leaflet";
import { FunctionComponent, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { trackClosestToPoint } from "../../converters/trackDataClosestToPoint";
import { changeEditingBlogpostPosition, changeEditingBlogpostTrack, setClickedEvent, setEditingBlogpost, setMapCenter, setMarkerPosition } from "../../store/blogPostStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Timeouts } from "../../constants/Timeouts";
import { coordinatesToLatLng, latLngToCoordinates } from "../../converters/coordinatesConverter";
import { CoordinatesDto } from "../../dtos/coordinatesDto";

export const BlogPostLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor));
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const tourTracks = useAppSelector((state) => state.tour.selectedTour?.tracks);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const markerPosition = useAppSelector((state) => state.blog.markerPosition);
    const clickedTime = useAppSelector((state) => state.blog.clickedEvent.time);
    const clickedLocation = useAppSelector((state) => state.blog.clickedEvent.location);
    const [dragging, setDragging] = useState(false);

    const map = useMap();
    
    const trackIdClosestToPoint = (position: CoordinatesDto) => {
        const closestTrackFileReference = trackClosestToPoint(selectedTracks, position)?.fileReference;
        return tourTracks?.find(t => t.fileReference === closestTrackFileReference)?.id ?? 0;
    }

    const dragEnd = (endposition: LatLng) => {
        if (clickedLocation) {
            dispatch(changeEditingBlogpostPosition(clickedLocation));
        }
        dispatch(setMarkerPosition(latLngToCoordinates(endposition)));
        const trackId = trackIdClosestToPoint({
            latitude: endposition.lat,
            longitude: endposition.lng
        });
        dispatch(changeEditingBlogpostTrack(trackId));
        setTimeout(() => setDragging(false), 50);
    }


    useMapEvents({
        move() {
            dispatch(setMapCenter(latLngToCoordinates(map.getCenter())))
        },
        mousedown(e) {
            dispatch(setClickedEvent({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
            }));
        },
        mouseup() {
            if (dragging) {
                return;
            }
            const timeDelta = (new Date().valueOf()) - clickedTime;
            if (timeDelta > Timeouts.CreateBlogPostHold && isContributor && clickedLocation) {
                dispatch(setMarkerPosition(clickedLocation));
                if (!isEditingBlogPost) {
                    dispatch(setEditingBlogpost({
                        id: 0,
                        latitude: clickedLocation.latitude,
                        longitude: clickedLocation.longitude,
                        title: '',
                        message: '',
                        images: [],
                        trackId: trackIdClosestToPoint(clickedLocation)
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

