import { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ProgressbarParams } from "../../data/progressbarParams";
import { locationDistanceFromStart } from "../../converters/trackDataClosestToPoint";
import { ProgressbarActiveSection } from "./ProgressbarActiveSection";
import { CoordinatesDto } from "../../dtos/shared/coordinatesDto";
import { setProgressDetails } from "../../store/viewStateReducer";

export const TourProgressbar: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const viewState = useAppSelector((state) => state.view);
    const blogPostView = viewState.mapMode !== 'tours';
    const showDetails = viewState.progressDetails;
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
        totalDistance: totalDistance,
        start: 0,
        length: 0,
        title: ''
    }

    const beforeDistance = (tourPosition: number): number => {
        const beforeDistances = allTracks
            .filter(t => t.tourPosition < tourPosition)
            .map(t => t.data.distance);
        return beforeDistances.length > 0 ? beforeDistances.reduce((a, b) => a + b) : 0;
    }

    const setDataForBlogPost = (title: string, trackId: number, coordinates: CoordinatesDto) => {
        const track = allTracks.find(t => trackId === t.id);
        if (track) {
            data.start = beforeDistance(track.tourPosition) +
                locationDistanceFromStart(track, coordinates);
            data.length = 0;
            data.title = title;
        }
    }

    if (selectedTrack) {
        data.start = beforeDistance(selectedTrack.tourPosition);
        data.length = selectedTrack.data.distance;
        data.title = selectedTrack.data.name;
    }
    else {
        data.start = 0;
        data.length = totalDistance;
        data.title = tourState.selectedTour.name
    }

    if (blogPostState.openedBlogPost) {
        setDataForBlogPost(blogPostState.openedBlogPost.title,
            blogPostState.openedBlogPost.track.id,
            blogPostState.openedBlogPost.coordinates);
    }

    if (blogPostState.selectedBlogPost) {
        setDataForBlogPost(blogPostState.selectedBlogPost.title,
            blogPostState.selectedBlogPost.track.id,
            blogPostState.selectedBlogPost.coordinates
        )
    }

    if (blogPostState.editingBlogPost) {
        setDataForBlogPost(blogPostState.editingBlogPost.title,
            blogPostState.editingBlogPost.trackId,
            blogPostState.editingBlogPost);
    }

    if (data.length === 0 && data.start === 0 && showDetails) {
        dispatch(setProgressDetails(false));
    }

    return <div className="relative h-1 w-full bottom-0 bg-highlight">
        <ProgressbarActiveSection data={data}/>
    </div>
}