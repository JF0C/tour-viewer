import { LatLng } from "leaflet";
import { FunctionComponent, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { MarkerIcons } from "../../constants/MarkerIcons";
import { Roles } from "../../constants/Rolenames";
import { trackClosestToPoint } from "../../converters/trackDataClosestToPoint";
import { changeEditingBlogpostPosition, changeEditingBlogpostTrack, setEditingBlogpost } from "../../store/blogPostStateReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Timeouts } from "../../constants/Timeouts";

export const BlogPostLocationEditor: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const isContributor = useAppSelector((state) => state.auth.user?.roles.includes(Roles.Contributor));
    const selectedTracks = useAppSelector((state) => state.track.tracks.filter(t => t.selected) ?? []);
    const tourTracks = useAppSelector((state) => state.tour.selectedTour?.tracks);
    const isEditingBlogPost = useAppSelector((state) => state.blog.editingBlogPost !== undefined);
    const [clickedTime, setClickedTime] = useState<Date | null>(null);
    const [clickedLocation, setClickedLocation] = useState<LatLng | null>(null);
    const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
    const [dragging, setDragging] = useState(false);

    const trackIdClosestToPoint = (position: LatLng) => {
        const closestTrackFileReference = trackClosestToPoint(selectedTracks, position)?.fileReference;
        return tourTracks?.find(t => t.fileReference === closestTrackFileReference)?.id ?? 0;
    }

    const dragEnd = (endposition: LatLng) => {
        dispatch(changeEditingBlogpostPosition({
            latitude: clickedLocation?.lat ?? 0,
            longitude: clickedLocation?.lng ?? 0
        }))
        const trackId = trackIdClosestToPoint(endposition);
        dispatch(changeEditingBlogpostTrack(trackId));
        setTimeout(() => setDragging(false), 50);
    }

    useMapEvents({
        mousedown(e) {
            setClickedTime(new Date())
            setClickedLocation(e.latlng)
        },
        mouseup() {
            if (dragging) {
                return;
            }
            const timeDelta = new Date().valueOf() - (clickedTime?.valueOf() ?? new Date().valueOf());
            if (timeDelta > Timeouts.CreateBlogPostHold && isContributor && clickedLocation) {
                setMarkerPosition(clickedLocation);
                if (!isEditingBlogPost) {
                    dispatch(setEditingBlogpost({
                        id: 0,
                        latitude: clickedLocation?.lat ?? 0,
                        longitude: clickedLocation?.lng ?? 0,
                        title: '',
                        message: '',
                        images: [],
                        trackId: trackIdClosestToPoint(clickedLocation)
                    }))
                }
                else {
                    dispatch(changeEditingBlogpostPosition({
                        latitude: clickedLocation?.lat ?? 0,
                        longitude: clickedLocation?.lng ?? 0
                    }))
                }
            }
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
            }} icon={MarkerIcons.orange} draggable position={markerPosition}>

        </Marker>
    }
    return <></>
}

