import { FunctionComponent } from "react";
import { useMapProvider } from "../../hooks/mapProviderHook";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { MapProviders } from "../../constants/MapProviders";

export const MapSelector: FunctionComponent = () => {
    const [mapProvider, setMapProvider] = useMapProvider();

    const handleChange = (event: SelectChangeEvent<string>) => {
        const mapProvider = MapProviders.find(m => m.name === event.target.value) ?? MapProviders[0];
        setMapProvider(mapProvider);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return <div className="p-2">
        <FormControl>
            <InputLabel id="map-provider-select-label">Map Provider</InputLabel>
            <Select
                labelId="map-provider-select-label"
                id="map-provider-select"
                label="Map Provider"
                size="small"
                value={mapProvider.name}
                onChange={handleChange}
            >
                {MapProviders.map(m => <MenuItem value={m.name}>{m.name}</MenuItem>)}
            </Select>
        </FormControl>
    </div>
}