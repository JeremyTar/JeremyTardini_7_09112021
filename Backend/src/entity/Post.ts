import { Entity, PrimaryGeneratedColumn, Column, getConnection, Connection, Repository, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('increment')
    postId: number;

    @Column({ type: "varchar", length: 20 })
    title: string;

    @Column({ type: "text"})
    content: string;

    @Column({ type: "varchar", length: 20, default: ''})
    categorie: string;

    @Column({ type: "varchar", length: 255, nullable: true})
    attachement: any;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    dislike: number;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
    
    @ManyToOne(() => User, user => user.posts, {
        cascade: true
    })
    @JoinColumn()
    user: User;
}
