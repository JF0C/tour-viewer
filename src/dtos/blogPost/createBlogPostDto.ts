export type CreateBlogPostDto = {
    id: number;
    trackId: number;
    trackFileReference: string;
    title: string;
    message: string;
    latitude: number;
    longitude: number;
    images: string[];
    labels: string[];
}