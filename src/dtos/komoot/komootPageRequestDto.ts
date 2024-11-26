import { PageRequestDto } from "../shared/pageRequestDto"

export type KomootPageRequestDto = PageRequestDto & {
    authString: string;
    userId: number;
}
