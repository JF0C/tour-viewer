import { CoordinatesDto } from "../dtos/coordinatesDto"

const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt
const PI = Math.PI

// equatorial mean radius of Earth (in meters)
const R = 6378137

const squared = (x: number) => x**2
const toRad = (x: number) => x * PI / 180.0
const hav = (x: number) => squared(sin(x / 2))

// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
export const haversine = (a: CoordinatesDto, b: CoordinatesDto) => {
    const aLat = toRad(a.latitude)
    const bLat = toRad(b.latitude)
    const aLng = toRad(a.longitude)
    const bLng = toRad(b.longitude)

    const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng)
    return 2 * R * asin(sqrt(ht))
}