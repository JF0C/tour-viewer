export type StravaActivityDto = {
    id: number,
    name: string,
    distance: number,
    moving_time: number,
    elapsed_time: number,
    start_date: number,
    start_date_local: number,
    start_latlng: number[],
    end_latlng: number[],
    map: {
        id: number,
        summary_polyline: string
    }
}