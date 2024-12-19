import { CommentDto } from "../comment/commentDto"
import { CoordinatesDto } from "../shared/coordinatesDto"
import { CountryDto } from "../shared/countryDto"
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
    tourTime: number,
    country: CountryDto,
    comments?: CommentDto[],
    labels: string[]
}
