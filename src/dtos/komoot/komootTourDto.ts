export type KomootTourDto = {
    id: string;
    name: string;
    date: number;
    changed_at: number;
    distance: number;
    duration: number;
    elevation_down: number;
    elevation_up: number;
    map_image: {src: string};
    map_image_preview: {src: string};
    time_in_motion: number;
}