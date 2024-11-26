import { StravaRequestDto } from "./stravaRequestDto";

export type StravaActivityDetailRequestDto = StravaRequestDto & {
    activityId: string,
    start_date: number,
    name: string
}