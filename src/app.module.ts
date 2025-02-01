import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'lms',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    CoursesModule,
    AuthModule,
    RolesModule,
    CommentsModule,
    PostsModule,
    EnrollmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
