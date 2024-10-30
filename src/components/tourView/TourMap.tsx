import { FunctionComponent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTrackRequest } from "../../store/trackThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TrackRoutes } from "./TrackRoutes";
import { TourBounds } from "./TourBounds";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { BlogPostMarker } from "../blogPost/BlogPostMarker";
import { BlogPostMapLocationEditor } from "../blogPost/BlogPostMapLocationEditor";
import { SecondaryClickCountdown } from "../blogPost/SecondaryClickCountdown";
import { setDataBarState } from "../../store/tourStateReducer";


export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const trackState = useAppSelector((state) => state.track);
    const dataSelectorBarState = useAppSelector((state) => state.tour.dataSelectorBarState);

    let content = <></>

    const blogPosts: BlogPostDto[] = [];

    if (trackState.loading) {
        content = <LoadingSpinner />
    }
    else {
        if (dataSelectorBarState === 'hide') {
            dispatch(setDataBarState('show'));
        }
        const missingTracks = tour?.tracks.filter(t => !trackState.tracks
            .find(tr => tr.fileReference === t.fileReference));
        if ((missingTracks?.length ?? 0) > 0) {
            for (let track of missingTracks!) {
                dispatch(loadTrackRequest(track.fileReference));
                return <LoadingSpinner />
            }
        }
        else {
            const selectedTracks = trackState.tracks.filter(t => t.selected);
            const firstTrackName = selectedTracks.length > 0 ? selectedTracks[0].fileReference : '';
            content = <>{selectedTracks.map(t => <TrackRoutes key={t.fileReference} isStart={firstTrackName === t.fileReference} track={t} />)}</>
            for (let t of (tour?.tracks ?? [])) {
                if (selectedTracks.find(ts => ts.fileReference === t.fileReference)?.selected) {
                    for (let b of t.blogPosts) {
                        blogPosts.push(b);
                    }
                }
            }
        }
    }

    return <MapContainer center={[48.136805, 11.578965]} zoom={13} zoomControl={false}
        scrollWheelZoom={true} touchZoom={true}>
        {content}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            blogPosts.map(b => <BlogPostMarker key={b.id} blogPost={b} />)
        }
        <TourBounds />
        <BlogPostMapLocationEditor />
        <SecondaryClickCountdown />
    </MapContainer>
}