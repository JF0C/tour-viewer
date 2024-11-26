import { PageRequestDto } from "../shared/pageRequestDto";

export type BlogpostPageRequestDto = {
    title?: string
    tourName?: string
    tourId?: number
    author?: number
} & PageRequestDto