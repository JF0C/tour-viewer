import { CoordinatesDto } from "./coordinatesDto"
import { EntityBaseDto } from "./entityBaseDto"
import { ImageReferenceDto } from "./imageReferenceDto"
import { UserReferenceDto } from "./userReferenceDto"

export type BlogPostDto = EntityBaseDto & {
    title: string,
    message: string,
    images: ImageReferenceDto[],
    coordinates: CoordinatesDto,
    author: UserReferenceDto
}
