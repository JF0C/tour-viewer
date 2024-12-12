import L from "leaflet";
import markerShadow from '../icon/marker-shadow.png'
import markerIconBlue from '../icon/marker-icon-2x-blue.png'
import markerIconGold from '../icon/marker-icon-2x-gold.png'
import markerIconRed from '../icon/marker-icon-2x-red.png'
import markerIconGreen from '../icon/marker-icon-2x-green.png'
import markerIconOrange from '../icon/marker-icon-2x-orange.png'
import markerIconBlack from '../icon/marker-icon-2x-black.png'
import markerIconYellow from '../icon/marker-icon-2x-yellow.png'
import markerIconGrey from '../icon/marker-icon-2x-grey.png'
import markerIconViolet from '../icon/marker-icon-2x-violet.png'
import markerIconBlogPost from '../icon/blogpost-marker.png'
import markerIconMoveFrom from '../icon/blogpost-marker-old-position.png'
import markerIconMoveTo from '../icon/blogpost-marker-new-position.png'
import markerOpenTour from '../icon/open-tour-marker.png'

export class MarkerIcons {
    public static readonly blue = L.icon({
        iconUrl: markerIconBlue,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly gold = L.icon({
        iconUrl: markerIconGold,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly red = L.icon({
        iconUrl: markerIconRed,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly green = L.icon({
        iconUrl: markerIconGreen,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly orange = L.icon({
        iconUrl: markerIconOrange,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly yellow = L.icon({
        iconUrl: markerIconYellow,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly violet = L.icon({
        iconUrl: markerIconViolet,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly grey = L.icon({
        iconUrl: markerIconGrey,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly black = L.icon({
        iconUrl: markerIconBlack,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly blogPost = L.icon({
        iconUrl: markerIconBlogPost,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly blogPostNew = L.icon({
        iconUrl: markerIconMoveTo,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly blogPostOld = L.icon({
        iconUrl: markerIconMoveFrom,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    public static readonly openTour = L.icon({
        iconUrl: markerOpenTour,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}