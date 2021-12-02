import { Entity, PrimaryGeneratedColumn, Column, getConnection, Connection, Repository, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentId: number;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @ManyToOne(() => Post, post => post.comments, {
        cascade: true
    })
    @JoinColumn()
    post: Post | number;

    @ManyToOne(() => User, user => user.comments, {
        cascade: true
    })
    @JoinColumn()
    user: User | string;
}
