import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
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
