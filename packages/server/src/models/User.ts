import bcrypt from "bcryptjs";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import Todo from "./Todo";

@Entity("users")
export default class User extends BaseEntity {
    /** Properties */
    @PrimaryGeneratedColumn({ name: "id" })
    public id: number;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    public updatedAt: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    public createdAt: Date;

    @Column({ unique: true, nullable: false, name: "email" })
    public email: string;

    @Column({ nullable: false, name: "password" })
    public password: string;

    /** before insert operations */
    @BeforeInsert()
    private async beforeInsert() {
        // bazi nedenlerden dolayi hash env'den okudugu salt icin hata veriyor
        const salt = process.env.SERVER_SALT || 10;
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Todo, todo => todo.user)
    @JoinColumn()
    public todos: Array<Todo>;
}
