import { FunctionComponent } from "react"
import { UserDto } from "../../dtos/userDto"

export type UserListItemProps = {
    user: UserDto
}

export const UserListItem: FunctionComponent<UserListItemProps> = (props) => {

    return <div className="grid grid-cols-4 gap-4">
        <div>
            { props.user.id }
        </div>
        <div>
            { props.user.username }
        </div>
        <div>
            { props.user.email }
        </div>
        <div>
            { props.user.roles.join(', ') }
        </div>
    </div>
}