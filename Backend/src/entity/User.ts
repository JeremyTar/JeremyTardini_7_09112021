import { Entity, PrimaryGeneratedColumn, Column, getConnection, Connection, Repository } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    userId!: any;

    @Column({ type: "varchar", length: 20 })
    firstName: string;

    @Column({ type: "varchar", length: 20 })
    lastName: string;

    @Column({ unique: true, type: "varchar", length: 20 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: any;

    @Column({ type: "varchar", length: 20, default: "" })
    role?: string;

    @Column({ type: "varchar", length: 255, default: "" })
    bio?: string;

    @Column({ default: false })
    isAdmin?: boolean;


}

export async function getUserRepository(): Promise<Repository<User>> {
    return getConnection().getRepository(User);
}