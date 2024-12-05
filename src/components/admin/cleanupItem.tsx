import { FunctionComponent } from "react";

export type CleanupItemProps = {
    data: string
}

export const CleanupItem: FunctionComponent<CleanupItemProps> = (props) => {

    let reason = props.data;
    let filename = '';
    const sepIndex = reason.indexOf(':');
    if (sepIndex > 0) {
        filename = props.data.substring(0, sepIndex);
        reason = props.data.substring(sepIndex + 1);
    }
    const dirIndex = filename.lastIndexOf('/');
    if (dirIndex > 0) {
        filename = filename.substring(dirIndex + 1);
    }

    return <>
        <div>
            {filename}
        </div>
        <div>
            {reason}
        </div>
    </>
}