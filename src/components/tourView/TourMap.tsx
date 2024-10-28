import { FunctionComponent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTrackRequest } from "../../store/trackThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TrackRoutes } from "./TrackRoutes";
import { TourBounds } from "./TourBounds";
import { BlogPostDto } from "../../dtos/blogPostDto";
import { BlogPostMarker } from "../blogPost/BlogPostMarker";
import { BlogPostLocationEditor } from "../blogPost/BlogPostLocationEditor";


export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const trackState = useAppSelector((state) => state.track);

    let content = <></>

    const blogPosts: BlogPostDto[] = [];

    if (trackState.loading) {
        content = <LoadingSpinner />
    }
    else {
        const missingTracks = tour?.tracks.filter(t => !trackState.tracks
            .find(tr => tr.fileReference === t.fileReference));
        if ((missingTracks?.length ?? 0) > 0) {
            for (let track of missingTracks!) {
                dispatch(loadTrackRequest(track.fileReference));
            }
        }
        else {
            content = <>{trackState.tracks.map(t => <TrackRoutes key={t.fileReference} track={t} />)}</>
            for (let t of (tour?.tracks ?? [])) {
                if (trackState.tracks.find(ts => ts.fileReference === t.fileReference)?.selected) {
                    for (let b of t.blogPosts) {
                        blogPosts.push(b);
                    }
                }
            }
        }
        console.log(blogPosts);
    }

    return <MapContainer center={[48.136805, 11.578965]} zoom={13}
        scrollWheelZoom={true} touchZoom={true}>
        {content}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            blogPosts.map(b => <BlogPostMarker blogPost={b} />)
        }
        <TourBounds />
        <BlogPostLocationEditor />
    </MapContainer>
}