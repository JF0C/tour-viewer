import * as React from 'react';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';

export const useSelectedTourId = (): [number | null, (newValue: number | null) => void] => {
    const [selectedTourId, storeSelectedTourId] = React.useState<number | null>(
        JSON.parse(localStorage.getItem(LocalStorageKeys.SelectedTourIdKey) ?? 'null')
    );

    React.useEffect(() => {
        localStorage.setItem(LocalStorageKeys.SelectedTourIdKey, JSON.stringify(selectedTourId));
    }, [selectedTourId]);

    return [selectedTourId, storeSelectedTourId];
};