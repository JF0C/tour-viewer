import { FunctionComponent } from "react";
import { locationDistanceFromStart, previousTracksDistance } from "../../converters/trackDataClosestToPoint";
import { ProgressbarParams } from "../../data/progressbarParams";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ProgressbarActiveSection } from "./ProgressbarActiveSection";

export const TourProgressbar: FunctionComponent = () => {
    const viewState = useAppSelector((state) => state.view);
    const blogPostView = viewState.mapMode !== 'tours';
    const tourState = useAppSelector((state) => state.tour);
    const allTracks = useAppSelector((state) => state.track.tracks);
    const selectedTracks = allTracks.filter(t => t.selected);
    const selectedTrack = selectedTracks.length === 1 ? selectedTracks[0] : undefined;
    const blogPostState = useAppSelector((state) => state.blog);

    if (!tourState.selectedTour || allTracks.length === 0 || blogPostView) {
        return <></>
    }

    const totalDistance = allTracks.length > 0 ?
        allTracks.map(t => t.data.distance).reduce((a, b) => a + b) :
        1;

    const data: ProgressbarParams = {
        id: tourState.selectedTour.id,
        totalDistance: totalDistance,
        start: 0,
        length: 0,
        title: '',
        type: 'tour',
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    }

    const setDataForBlogPost = (id: number, title: string, trackId: number, coordinates: CoordinatesDto) => {
        const track = allTracks.find(t => trackId === t.id);
        if (track) {
            data.id = id;
            data.start = previousTracksDistance(allTracks, track.tourPosition) +
                locationDistanceFromStart(track, coordinates);
            data.length = 0;
            data.title = title;
            data.type = 'marker';
        }
    }

    if (selectedTrack) {
        data.start = previousTracksDistance(allTracks, selectedTrack.tourPosition);
        data.length = selectedTrack.data.distance;
        data.title = selectedTrack.data.name;
        data.type = 'track';
    }
    else {
        data.start = 0;
        data.length = totalDistance;
        data.title = tourState.selectedTour.name;
        data.type = 'tour';
    }

    if (blogPostState.openedBlogPost) {
        setDataForBlogPost(
            blogPostState.openedBlogPost.id,
            blogPostState.openedBlogPost.title,
            blogPostState.openedBlogPost.track.id,
            blogPostState.openedBlogPost.coordinates
        );
    }

    if (blogPostState.selectedBlogPost) {
        setDataForBlogPost(
            blogPostState.selectedBlogPost.id,
            blogPostState.selectedBlogPost.title,
            blogPostState.selectedBlogPost.track.id,
            blogPostState.selectedBlogPost.coordinates
        )
    }

    if (blogPostState.editingBlogPost) {
        setDataForBlogPost(
            blogPostState.editingBlogPost.id,
            blogPostState.editingBlogPost.title,
            blogPostState.editingBlogPost.trackId,
            blogPostState.editingBlogPost
        );
    }

    return <div className="relative h-1 w-full bottom-0 bg-highlight">
        <ProgressbarActiveSection data={data}/>
    </div>
}