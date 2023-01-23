import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("todos")
export default class Todo extends BaseEntity {
    /** Properties */
    @PrimaryGeneratedColumn({ name: "id" })
    public id: number;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    public updatedAt: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    public createdAt: Date;

    @Column("varchar", { array: true, length: 20 })
    public tags: Array<string>;

    @Column({ type: "text" })
    public todo: string;

    @Column({ type: "text", nullable: true })
    public imageUrl: string;

    @Column({ type: "text", nullable: true })
    public fileUrl: string;

    @ManyToOne(() => User, user => user.todos)
    public user: User;
}
