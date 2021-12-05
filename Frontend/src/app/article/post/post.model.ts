export interface Post {
    postId: number | string;
    title: string;
    content: string;
    attachement: any;
    categorie: string,
    like: number,
    dislike: number,
}