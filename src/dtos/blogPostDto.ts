import { CommentDto } from "./commentDto"
import { CoordinatesDto } from "./coordinatesDto"
import { EntityBaseDto } from "./entityBaseDto"
import { ImageReferenceDto } from "./imageReferenceDto"
import { TrackDto } from "./trackDto"
import { UserReferenceDto } from "./userReferenceDto"

export type BlogPostDto = EntityBaseDto & {
    title: string,
    track: TrackDto,
    message: string,
    images: ImageReferenceDto[],
    coordinates: CoordinatesDto,
    author: UserReferenceDto,
    comments?: CommentDto[]
}
