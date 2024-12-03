import * as React from 'react';

const selectedTourIdKey = 'selected-tour-id';

export const useSelectedTourId = (): [number | null, (newValue: number | null) => void] => {
    const [selectedTourId, setSelectedTourId] = React.useState<number | null>(
        JSON.parse(localStorage.getItem(selectedTourIdKey) ?? 'null')
    );

    React.useEffect(() => {
        localStorage.setItem(selectedTourIdKey, JSON.stringify(selectedTourId));
    }, [selectedTourId]);

    return [selectedTourId, setSelectedTourId];
};