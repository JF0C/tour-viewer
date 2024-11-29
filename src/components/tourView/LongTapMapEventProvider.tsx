import { FunctionComponent, ReactNode, Touch } from "react";
import { setReleasePosition, setTapPosition } from "../../store/mapStateReducer";
import { useAppDispatch } from "../../store/store";

export type LongTapMapEventProviderProps = {
    children: ReactNode
}

export const LongTapMapEventProvider: FunctionComponent<LongTapMapEventProviderProps> = (props) => {
    const dispatch = useAppDispatch();

    const touchStart = (e: Touch) => {
        dispatch(setTapPosition({x: e.clientX, y: e.clientY - 52}));
    }

    const touchEnd = (e: Touch) => {
        dispatch(setReleasePosition({x: e.clientX, y: e.clientY - 52}));
    }

    return <div className="w-full h-full"
        onTouchStart={(e) => touchStart(e.touches[0])}
        onTouchEnd={(e) => touchEnd(e.changedTouches[0])}
        onTouchCancel={(e) => touchEnd(e.changedTouches[0])}>
        {props.children}
    </div>
}