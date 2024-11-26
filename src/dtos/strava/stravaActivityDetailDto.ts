export type StravaActivityDetailDto = [
    StravaDataSeries<number[]>,
    StravaDataSeries<number>,
    StravaDataSeries<number>,
    StravaDataSeries<number>
]

export type StravaDataSeries<T> = {
    type: string,
    data: T[],
    original_size: number
};
