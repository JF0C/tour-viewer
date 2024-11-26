import { FunctionComponent } from "react"
import { UserDto } from "../../dtos/user/userDto"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { setUserForEditing } from "../../store/adminStateReducer"

export type UserListItemProps = {
    user: UserDto
}

export const UserListItem: FunctionComponent<UserListItemProps> = (props) => {
    const dispatch = useAppDispatch()
    const editingUserId = useAppSelector((state) => state.admin.userForEditing?.id)
    const selectedClass = editingUserId === props.user.id ? 'selected' : ''

    const selectUser = () => {
        dispatch(setUserForEditing(props.user))
    }

    return <tr onClick={selectUser} className={`user-list-item ${selectedClass}`}>
        <td>
            {props.user.id}
        </td>
        <td>
            {props.user.username}
        </td>
        <td>
            {props.user.email}
        </td>
    </tr>
}