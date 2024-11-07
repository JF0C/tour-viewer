import { PageRequestDto } from "./pageRequestDto";

export type BlogpostPageRequestDto = {
    title?: string
    tourName?: string
    tourId?: number
    author?: number
} & PageRequestDto