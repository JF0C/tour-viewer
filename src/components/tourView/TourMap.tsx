import { FunctionComponent, ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { haversine } from "../../converters/haversine";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { useMapProvider } from "../../hooks/mapProviderHook";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/tourStateReducer";
import { startLoadingTrack } from "../../store/trackStateReducer";
import { loadTrackRequest } from "../../store/trackThunk";
import { BlogPostMapLocationEditor } from "../blogPost/BlogPostMapLocationEditor";
import { BlogPostMarker } from "../blogPost/BlogPostMarker";
import { SecondaryClickCountdown } from "../blogPost/SecondaryClickCountdown";
import { OverallLoadingSpinner } from "../shared/OverallLoadingSpinner";
import { GraphDataPoint } from "./GraphDataPoint";
import { InfoBarHandle } from "./InfoBarHandle";
import { LongTapMapEventProvider } from "./LongTapMapEventProvider";
import { LongTapMapLocationConverter } from "./LongTapMapLocationConverter";
import { TourBounds } from "./TourBounds";
import { TourPreview } from "./TourPreview";
import { TrackLine } from "./TrackLine";

export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const tour = tourState.selectedTour;
    const trackState = useAppSelector((state) => state.track);
    const infobarOpen = useAppSelector((state) => state.view.infobarOpen);
    const dataSelectorBarState = useAppSelector((state) => state.tour.dataSelectorBarState);
    const [mapProvider] = useMapProvider();

    let content = <></>

    const blogPosts: BlogPostDto[] = [];

    if (trackState.loading || trackState.tracks.find(t => t.loading)) {
        content = <OverallLoadingSpinner />
    }
    else if (tourState.selectedTourId) {
        if (dataSelectorBarState === 'hide') {
            dispatch(setDataBarState('show'));
        }
        const missingTracks = tour?.tracks.filter(t => !trackState.tracks
            .find(tr => tr.fileReference === t.fileReference));
        if ((missingTracks?.length ?? 0) > 0) {
            for (let missing of missingTracks!) {
                dispatch(startLoadingTrack({fileReference: missing.fileReference, id: missing.id}));
                dispatch(loadTrackRequest({
                    id: missing.id,
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
            const showDataColor = selectedTracks.length === 1 && infobarOpen;
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
                tracks.push(<TrackLine key={track.fileReference} dataColor={showDataColor} track={track} startMarker={showStartMarker} />);
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
    else {
        const previews: ReactNode[] = [];
        tourState.tours.forEach((t, i) => {
            previews.push(<TourPreview key={'tour-preview-' + t.id} tour={t} index={i} />)
        });
        content = <>{previews}</>
    }
    const blogPostElements: any[] = blogPosts.map(b => <BlogPostMarker key={b.id} blogPost={b} />)

    return <LongTapMapEventProvider>
        <MapContainer center={[48.136805, 11.578965]} zoom={13} zoomControl={false}
            scrollWheelZoom={true} touchZoom={true} style={{ userSelect: 'none' }}>
            {content}
            <TileLayer
                attribution={mapProvider.attribution}
                url={mapProvider.url}
            />
            <MarkerClusterGroup polygonOptions={{ smoothFactor: 1, noClip: true }}>
                {
                    blogPostElements
                }
            </MarkerClusterGroup>
            <TourBounds />
            <BlogPostMapLocationEditor />
            <SecondaryClickCountdown />
            <InfoBarHandle />
            <GraphDataPoint />
            <LongTapMapLocationConverter />
        </MapContainer>
    </LongTapMapEventProvider>

}