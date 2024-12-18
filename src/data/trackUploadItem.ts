export type TrackUploadItem = {
    id: number
    name: string;
    tourPosition: number;
    isValid: boolean;
    data: string;
    state: 'ready' | 'loading' | 'finished' | 'error';
}