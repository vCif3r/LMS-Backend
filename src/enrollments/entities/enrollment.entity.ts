import { Course } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('enrollments')
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, (student) => student.enrollments)
    student: User
    @ManyToOne(() => Course, (course) => course.enrollments)
    course: Course;
    @Column({ default: 'active' }) // Puede ser 'active', 'completed', 'dropped'
    status: string;

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}
