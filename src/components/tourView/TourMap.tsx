import { FunctionComponent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { haversine } from "../../converters/haversine";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";
import { startLoadingTrack } from "../../store/trackStateReducer";
import { loadTrackRequest } from "../../store/trackThunk";
import { BlogPostMapLocationEditor } from "../blogPost/BlogPostMapLocationEditor";
import { BlogPostMarker } from "../blogPost/BlogPostMarker";
import { SecondaryClickCountdown } from "../blogPost/SecondaryClickCountdown";
import { OverallLoadingSpinner } from "../shared/OverallLoadingSpinner";
import { TourBounds } from "./TourBounds";
import { TrackLine } from "./TrackLine";
import { InfoBarHandle } from "./InfoBarHandle";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { GraphDataPoint } from "./GraphDataPoint";

export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const trackState = useAppSelector((state) => state.track);
    const dataSelectorBarState = useAppSelector((state) => state.tour.dataSelectorBarState);

    let content = <></>

    const blogPosts: BlogPostDto[] = [];

    if (trackState.loading || trackState.tracks.find(t => t.loading)) {
        content = <OverallLoadingSpinner />
    }
    else {
        if (dataSelectorBarState === 'hide') {
            dispatch(setDataBarState('show'));
        }
        const missingTracks = tour?.tracks.filter(t => !trackState.tracks
            .find(tr => tr.fileReference === t.fileReference));
        if ((missingTracks?.length ?? 0) > 0) {
            for (let missing of missingTracks!) {
                dispatch(startLoadingTrack(missing.fileReference));
                dispatch(loadTrackRequest({
                    fileReference: missing.fileReference,
                    name: missing.name,
                    tourPosition: missing.tourPosition
                }));
            }
        }
        else {
            const selectedTracks = trackState.tracks.filter(t => t.selected);
            const firstTrackName = selectedTracks.length > 0 ? selectedTracks[0].fileReference : '';
            const tracks = [];
            for (let k = 0; k < selectedTracks.length; k++) {
                const track = selectedTracks[k];
                let showStartMarker = track.fileReference === firstTrackName;
                if (k > 0) {
                    const lastPoints = selectedTracks[k - 1].data.points;
                    const lastPoint = lastPoints[lastPoints.length - 1];
                    const start: CoordinatesDto = {
                        latitude: track.data.points[0].latitude,
                        longitude: track.data.points[0].longitude
                    };
                    const end: CoordinatesDto = {
                        latitude: lastPoint.latitude,
                        longitude: lastPoint.longitude
                    };
                    const distance = haversine(end, start);
                    showStartMarker ||= distance > 10000;
                }
                tracks.push(<TrackLine key={track.fileReference} track={track} startMarker={showStartMarker} />);
            }
            content = <>{tracks}</>;
            for (let t of (tour?.tracks ?? [])) {
                if (selectedTracks.find(ts => ts.fileReference === t.fileReference)?.selected) {
                    for (let b of t.blogPosts) {
                        blogPosts.push(b);
                    }
                }
            }
        }
    }
    const blogPostElements: any[] = blogPosts.map(b => <BlogPostMarker key={b.id} blogPost={b} />)

    return <MapContainer center={[48.136805, 11.578965]} zoom={13} zoomControl={false}
        scrollWheelZoom={true} touchZoom={true} style={{ userSelect: 'none' }}>
        {content}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup polygonOptions={{smoothFactor: 1, noClip: true}}>
            {
                blogPostElements
            }
        </MarkerClusterGroup>
        <TourBounds />
        <BlogPostMapLocationEditor />
        <SecondaryClickCountdown />
        <InfoBarHandle />
        <GraphDataPoint />
    </MapContainer>
}