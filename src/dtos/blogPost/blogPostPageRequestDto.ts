import { GeoBounds } from "../../data/geoBounds";
import { PageRequestDto } from "../shared/pageRequestDto";

export type BlogpostPageRequestDto = {
    title?: string
    tour?: number
    author?: number
    bounds?: GeoBounds
    labels?: string[]
} & PageRequestDto