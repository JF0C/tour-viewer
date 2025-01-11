import { FunctionComponent, ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { haversine } from "../../converters/haversine";
import { BlogPostDto } from "../../dtos/blogPost/blogPostDto";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { useMapProvider } from "../../hooks/mapProviderHook";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setDataBarState } from "../../store/viewStateReducer";
import { addTrackMarkerReference, startLoadingTrack } from "../../store/trackStateReducer";
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
import { BlogPostView } from "../blogPostSearch/BlogPostView";
import { locationDistanceFromStart, previousTracksDistance } from "../../converters/trackDataClosestToPoint";

export const TourMap: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const tourState = useAppSelector((state) => state.tour);
    const tour = tourState.selectedTour;
    const trackState = useAppSelector((state) => state.track);
    const viewState = useAppSelector((state) => state.view);
    const dataSelectorBarState = useAppSelector((state) => state.view.dataSelectorBarState);
    const [mapProvider] = useMapProvider();

    let content = <></>

    const blogPosts: BlogPostDto[] = [];

    if (trackState.loading || trackState.tracks.find(t => t.loading)) {
        content = <OverallLoadingSpinner />
    }
    else if(viewState.mapMode === 'blogPosts') {
        content = <BlogPostView />
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
            const showDataColor = selectedTracks.length === 1 && viewState.infobarOpen;
            let markerCount = 0;
            for (let k = 0; k < selectedTracks.length; k++) {
                const track = selectedTracks[k];
                let showStartMarker = track.fileReference === firstTrackName;
                if (k > 0) {
                    const lastPoints = selectedTracks[k - 1].data.points;
                    const lastPoint = lastPoints[lastPoints.length - 1];
                    if ((track?.data?.points?.length ?? 0) > 0) {
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
                }
                const startMarkerId = showStartMarker ? markerCount++ : undefined;
                const markerId = markerCount++;
                tracks.push(<TrackLine key={track.fileReference}
                    startMarker={startMarkerId}
                    id={markerId}
                    dataColor={showDataColor} track={track} />);
            }
            content = <>{tracks}</>;
            for (let t of (tour?.tracks ?? [])) {
                const trackEntity = selectedTracks.find(ts => ts.fileReference === t.fileReference);
                if (trackEntity?.selected) {
                    for (let b of t.blogPosts) {
                        blogPosts.push(b);
                        if (!trackState.markerReferences.find(r => r.type === 'blogPost' && r.id === b.id)) {
                            dispatch(addTrackMarkerReference({
                                id: b.id,
                                title: b.title,
                                type: 'blogPost',
                                tourDistance: previousTracksDistance(trackState.tracks, t.tourPosition) + 
                                    locationDistanceFromStart(trackEntity, b.coordinates),
                                selected: false,
                                coordinates: b.coordinates
                            }));
                        }
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
                    blogPosts.map(b => <BlogPostMarker key={b.id} blogPost={b} />)
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