export type CreateBlogPostDto = {
    id: number;
    trackId: number;
    title: string;
    message: string;
    latitude: number;
    longitude: number;
    images: string[];
}