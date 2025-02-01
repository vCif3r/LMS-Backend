import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { Role } from "src/roles/entities/role.entity";
import { Enrollment } from "src/enrollments/entities/enrollment.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Post } from "src/posts/entities/post.entity";
import { Course } from "src/courses/entities/course.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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
    role: Role

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
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
}
