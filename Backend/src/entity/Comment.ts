import { Entity, PrimaryGeneratedColumn, Column, getConnection, Connection, Repository, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentId: number;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post | number;

    @ManyToOne(() => User, user => user.comments)
    user: User | string;
}
