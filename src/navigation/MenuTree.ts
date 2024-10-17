import { Paths } from "../constants/Paths";
import { MenuGroup } from "./MenuGroup";

export const menuTree: MenuGroup[] = [
    {
        displayName: '2022 Athens',
        path: Paths.Athens2022Path,
        items: [
            {
                tour: Paths.Athens2022_01Path,
                displayName: '01 Muenchen -> Bad Aibling'
            },
            {
                tour: Paths.Athens2022_02Path,
                displayName: '02 - Bad Aibling -> Salzburg'
            }
        ]
    },
    {
        displayName: '2022 Mit Dir',
        path: Paths.MitDir2022Path,
        items: [
            {
                tour: Paths.MitDir2022_01Path,
                displayName: '01 München -> Murner See'
            },
            {
                tour: Paths.MitDir2022_02Path,
                displayName: '02 - Murner See -> Schöneck'
            }
        ]
    }
]
