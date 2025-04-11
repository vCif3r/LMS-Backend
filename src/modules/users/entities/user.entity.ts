import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Role } from "src/modules/roles/entities/role.entity";
import { Enrollment } from "src/modules/enrollments/entities/enrollment.entity";
import { Course } from "src/modules/courses/entities/course.entity";
import { Post } from "src/modules/posts/entities/post.entity";
import { Comment } from "src/modules/comments/entities/comment.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    email: string

    @Column({nullable: true})
    image: string

    @Exclude()
    @Column()
    password: string

    @Column()
    dni: string

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'roleId' })
    role: Role

    @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
    enrollments: Enrollment[];
    @OneToMany(() => Course, (c) => c.instructor)
    courses: Course[];
    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
}
