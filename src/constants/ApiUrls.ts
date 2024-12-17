
export class ApiUrls
{
    // public static readonly BaseUrl = 'https://tourviewer.c11g.net'
    public static BaseUrl = '.'
    // public static BaseUrl = 'https://localhost:7271'

    public static readonly VersionEndpoint = '/System/Version'
    public static readonly CleanupEndpoint = '/System/ManualCleanup'
    public static readonly TourDataJobEndpoint = '/System/ManualTourDataJob'
    public static readonly BlogPostDataJobEndpoint = 'System/ManualBlogPostDataJob'
    public static readonly CountryInUseJobEndpoint = 'System/ManualCountryInUseJob'

    public static readonly ImageEndpoint = '/img'
    public static readonly ImageControlEndpoint = '/Image'

    public static readonly UserEndpoint = '/User'
    public static readonly ChangeUsernameEndpoint = '/User/Username'
    public static readonly SearchUsersEndpoint = '/User/Search'
    public static readonly ProfilePictureEndpoint = '/User/ProfilePicture'
    public static readonly ProfilePictureParametersEndpoint = '/User/ProfilePictureParameters'

    public static readonly AdminEndpoint = '/Admin'
    public static readonly AdminRolesEndpoint = '/Admin/Roles'

    public static readonly CountryEndpoint = '/Country'

    public static readonly AuthenticationEndpoint = '/Authentication'
    public static readonly PasswordEndpoint = '/Authentication/Password'
    public static readonly ValidateCodeEndpoint = '/Authentication/Validate'
    public static readonly RequestCodeEndpoint = '/Authentication/Code'
    public static readonly LoginEndpoint = '/Authentication/Login'
    public static readonly LogoutEndpoint = '/Authentication/Logout'

    public static readonly TourEndpoint = '/Tour'
    public static readonly TrackEndpoint = '/Track'
    public static readonly BlogPostEndpoint = '/BlogPost'
    public static readonly BlogPostLabelEndpoint = '/BlogPostLabel'

    public static readonly ExternalSourceEndpoint = '/ExternalTrackSource'
    public static readonly StravaClientIdEndpoint = '/StravaClientId'
    public static readonly StravaTokenEndpoint = '/StravaToken'
    public static readonly StravaRefreshEndpoint = '/StravaRefresh'

    public static readonly KomootLoginUrl = 'https://api.komoot.de/v006/account/email'
    public static readonly KomootApiUrl = 'https://www.komoot.de/api/v007'

    public static readonly StravaAuthorizationUrl = 'https://www.strava.com/oauth/authorize'
    public static readonly StravaApiUrl = 'https://strava.com/api/v3'
}