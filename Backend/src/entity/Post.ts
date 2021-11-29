import { Entity, PrimaryGeneratedColumn, Column, getConnection, Connection, Repository } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('increment')
    postId: number;

    @Column({ type: "varchar", length: 20 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({ type: "varchar", length: 150, default: '' })
    attachement?: string;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    dislike: number;
}

let connection: Connection;

export async function getPostRepository(): Promise<Repository<Post>> {
    return getConnection().getRepository(Post);
}