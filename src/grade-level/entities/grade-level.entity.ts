import { Course } from "src/courses/entities/course.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Level {
    PRIMARIA = "primaria",
    SECUNDARIA = "secundaria",
}

@Entity('grade-level')
export class GradeLevel {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({type: 'enum', enum: Level,default: Level.PRIMARIA,})
    level: Level
    @Column({nullable: true})
    description: string
    @OneToMany(()=> Course, (course)=>course.gradeLevel)
    courses: Course[]
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date;
}
