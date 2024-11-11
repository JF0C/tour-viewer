import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { UserListItem } from "./userListItem";

export const UserList: FunctionComponent = () => {
    const adminState = useAppSelector((state) => state.admin)

    if (adminState.loading || adminState.users === undefined) {
        return <LoadingSpinner />
    }

    return <div className="flex-1 w-full">
        <table className="text-left w-full">
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>
                {adminState.users.map(u => <UserListItem key={u.id} user={u} />)}
            </tbody>
        </table>
    </div>
}