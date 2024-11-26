import { PageRequestDto } from "../shared/pageRequestDto";

export type TourPageRequestDto = {
    participantId?: number
    year?: number
    month?: number
    name?: string
} & PageRequestDto
