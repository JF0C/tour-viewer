import { FunctionComponent } from "react"
import { UserDto } from "../../dtos/userDto"
import { Button } from "@mui/material"

export type UserListItemProps = {
    user: UserDto
}

export const UserListItem: FunctionComponent<UserListItemProps> = (props) => {
    const roles = props.user.roles.join(', ')

    return <tr>
        <td>
            {props.user.id}
        </td>
        <td>
            {props.user.username}
        </td>
        <td>
            {props.user.email}
        </td>
        <td>
            {
                roles ? <Button>{roles}</Button>
                : <Button>Add role</Button>
            }
        </td>
        <td>
            <Button>Delete</Button>
        </td>
    </tr>
}