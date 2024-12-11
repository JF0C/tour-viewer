import { GeoBounds } from "./geoBounds"

export type BlogPostSearchFilter = {
    title?: string
    tour?: number
    tourName?: string
    author?: number
    authorName?: string
    bounds?: GeoBounds
    labels?: string[]
}