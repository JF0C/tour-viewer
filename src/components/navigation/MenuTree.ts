import { Paths } from "../../constants/Paths";
import { MenuGroup } from "./MenuGroup";

export const menuTree: MenuGroup[] = [
    {
        displayName: '2022 Athens',
        path: Paths.Athens2022Path,
        items: [
            {
                id: 1,
                tourPosition: 1,
                name: '01 Muenchen -> Bad Aibling'
            },
            {
                id: 2,
                tourPosition: 2,
                name: '02 - Bad Aibling -> Salzburg'
            }
        ]
    },
    {
        displayName: '2022 Mit Dir',
        path: Paths.MitDir2022Path,
        items: [
            {
                id: 1,
                tourPosition: 1,
                name: '01 München -> Murner See'
            },
            {
                id: 2,
                tourPosition: 2,
                name: '02 - Murner See -> Schöneck'
            }
        ]
    }
]
