import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @OneToMany(()=> User, user => user.role)
    users: User[]
    
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}
