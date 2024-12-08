import { PageRequestDto } from "../shared/pageRequestDto";
import { StravaRequestDto } from "./stravaRequestDto";

export type StravaActivitiesRequestDto = StravaRequestDto & PageRequestDto & {
    before?: number;
    after?: number;
}