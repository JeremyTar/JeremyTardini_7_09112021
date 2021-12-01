import { Entity, PrimaryGeneratedColumn, Column, getConnection, Repository, OneToMany, JoinColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({ type: "varchar", length: 20 })
    firstName: string;

    @Column({ type: "varchar", length: 20 })
    lastName: string;

    @Column({ unique: true, type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: any;

    @Column({ type: "varchar", length: 20, default: "" })
    role?: string;

    @Column({ type: "varchar", length: 255, default: "" })
    bio?: string;

    @Column({ default: false })
    isAdmin?: boolean;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}
