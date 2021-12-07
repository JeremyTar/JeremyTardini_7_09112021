import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('increment')
    postId: number;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "text"})
    content: string;

    @Column({ type: "varchar", length: 20})
    categorie: string;

    @Column({type: "varchar"})
    createdUserId: string;

    @Column({ type: "varchar", length: 255, nullable: true})
    attachement: string;

    @Column({ type: 'simple-array'})
    likes: string[];

    @Column({ type: 'simple-array'})
    dislikes: string[];

    @OneToMany(() => Comment, comment => comment.post, {
    cascade: true })
    @JoinColumn()
    comments: Comment[];
    
    @ManyToOne((type) => User, user => user.posts, {
        onDelete: 'CASCADE',
    })
    user: User;
}
