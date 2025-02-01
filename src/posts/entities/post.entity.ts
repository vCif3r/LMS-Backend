import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string;

    @Column('text')
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
    
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}
