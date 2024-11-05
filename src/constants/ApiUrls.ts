
export class ApiUrls
{
    // public static readonly BaseUrl = 'https://tourviewer.c11g.net'
    public static BaseUrl = '.'
    // public static BaseUrl = 'https://localhost:7271'
    public static readonly ImageEndpoint = '/img'
    public static readonly ImageUploadEndpoint = '/Image'

    public static readonly UserEndpoint = '/User'
    public static readonly ChangeUsernameEndpoint = '/User/Username'
    public static readonly SearchUsersEndpoint = '/User/Search'
    public static readonly ProfilePictureEndpoint = '/User/ProfilePicture'

    public static readonly AdminEndpoint = '/Admin'
    public static readonly AdminRolesEndpoint = '/Admin/Roles'

    public static readonly AuthenticationEndpoint = '/Authentication'
    public static readonly PasswordEndpoint = '/Authentication/Password'
    public static readonly ValidateCodeEndpoint = '/Authentication/Validate'
    public static readonly RequestCodeEndpoint = '/Authentication/Code'
    public static readonly LoginEndpoint = '/Authentication/Login'
    public static readonly LogoutEndpoint = '/Authentication/Logout'

    public static readonly TourEndpoint = '/Tour'

    public static readonly TrackEndpoint = '/Track'

    public static readonly BlogPostEndpoint = '/BlogPost'
}