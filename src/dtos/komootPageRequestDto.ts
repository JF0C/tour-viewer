import { PageRequestDto } from "./pageRequestDto"

export type KomootPageRequestDto = PageRequestDto & {
    authString: string;
    userId: number;
}
