import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    commentId: number;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({type: "varchar", length: 50, nullable: false})
    userTag: string;

    @ManyToOne(type => Post, post => post.comments)
    post: any;

    @ManyToOne(type => User, user => user.comments)
    user: User;
}
