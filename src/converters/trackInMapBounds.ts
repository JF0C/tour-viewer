import L from 'leaflet'

export const trackInMapBounds = (trackBounds: L.LatLngBounds, mapBounds: L.LatLngBounds): boolean => {
    if (trackBounds.getWest() > mapBounds.getEast()) {
        return false;
    }
    if (trackBounds.getEast() < mapBounds.getWest()) {
        return false;
    }
    if (trackBounds.getSouth() > mapBounds.getNorth()) {
        return false;
    }
    if (trackBounds.getNorth() < mapBounds.getSouth()) {
        return false;
    }
    return true;
}