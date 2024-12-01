import * as React from 'react';
import { MapProviders } from '../constants/MapProviders';
import { MapProvider } from '../data/mapProvider';

const mapProviderKey = 'map-provider';

export const useMapProvider = (): [MapProvider, (newValue: MapProvider) => void] => {
    const [mapProvider, setMapProvider] = React.useState<MapProvider>(
        JSON.parse(localStorage.getItem(mapProviderKey) ?? 'null') ?? MapProviders[0]
    );

    React.useEffect(() => {
        localStorage.setItem(mapProviderKey, JSON.stringify(mapProvider));
    }, [mapProvider]);

    return [mapProvider, setMapProvider];
};