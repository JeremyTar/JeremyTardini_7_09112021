export interface Post {
    postId: number | string;
    title: string;
    content: string;
    attachement: any;
    categorie: string,
    likes: string[],
    dislikes: string[],
    createdUser: string,
}