import { Enrollment } from "src/enrollments/entities/enrollment.entity";
import { GradeLevel } from "src/grade-level/entities/grade-level.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({type: 'text'})
    description: string
    @Column()
    startDate: Date
    @Column()
    endDate: Date
    @Column({nullable: true})
    image: string
    @Column({default: false})
    isActive: boolean
    @ManyToOne(()=> User, (instructor) => instructor.courses, {nullable: true})
    instructor: User
    @ManyToOne(()=> GradeLevel, (gl) => gl.courses, {nullable: true})
    gradeLevel: GradeLevel
    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments: Enrollment[];
    // timestamps
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}
