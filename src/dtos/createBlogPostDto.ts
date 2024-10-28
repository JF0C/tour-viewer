export type CreateBlogPostDto = {
    trackId: number;
    title: string;
    message: string;
    latitude: number;
    longitude: number;
    images: string[];
}