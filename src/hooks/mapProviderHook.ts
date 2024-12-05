import * as React from 'react';
import { MapProviders } from '../constants/MapProviders';
import { MapProvider } from '../data/mapProvider';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';

export const useMapProvider = (): [MapProvider, (newValue: MapProvider) => void] => {
    const [mapProvider, setMapProvider] = React.useState<MapProvider>(
        JSON.parse(localStorage.getItem(LocalStorageKeys.MapProviderKey) ?? 'null') ?? MapProviders[0]
    );

    React.useEffect(() => {
        localStorage.setItem(LocalStorageKeys.MapProviderKey, JSON.stringify(mapProvider));
    }, [mapProvider]);

    return [mapProvider, setMapProvider];
};