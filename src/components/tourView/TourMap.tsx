import { FunctionComponent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loadTrackRequest } from "../../store/trackThunk";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TrackRoutes } from "./TrackRoutes";
import { TourBounds } from "./TourBounds";


export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tour = useAppSelector((state) => state.tour.selectedTour);
    const trackState = useAppSelector((state) => state.track);


    let content = <></>

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
        }
    }

    return <MapContainer center={[48.136805, 11.578965]} zoom={13} scrollWheelZoom={true} touchZoom={true}>
        {content}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { trackState.boundsSet ? <></> : <TourBounds /> }
    </MapContainer>
}