import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}
