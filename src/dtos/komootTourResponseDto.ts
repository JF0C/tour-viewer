import { KomootTourDto } from "./komootTourDto"

export type KomootTourResponseDto = {
    _embedded: {
        tours: KomootTourDto[]
    }
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    }
}