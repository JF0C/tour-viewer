import { CommentDto } from "../comment/commentDto"
import { CoordinatesDto } from "../shared/coordinatesDto"
import { EntityBaseDto } from "../shared/entityBaseDto"
import { ImageReferenceDto } from "../shared/imageReferenceDto"
import { TrackDto } from "../track/trackDto"
import { UserReferenceDto } from "../user/userReferenceDto"

export type BlogPostDto = EntityBaseDto & {
    title: string,
    track: TrackDto,
    message: string,
    images: ImageReferenceDto[],
    coordinates: CoordinatesDto,
    author: UserReferenceDto,
    comments?: CommentDto[],
    labels: string[]
}
