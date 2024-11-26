export type TrackDownloadItem = {
    id: string;
    name: string;
    date: number;
    distance: number;
    previewImageUrl: string;
    state: 'ready' | 'loading' | 'finished' | 'error';
    data?: string;
}