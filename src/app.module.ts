import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module'; 
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { CommentsModule } from './modules/comments/comments.module';
import { PostsModule } from './modules/posts/posts.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { GradeLevelModule } from './modules/grade-level/grade-level.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    CoursesModule,
    AuthModule,
    RolesModule,
    CommentsModule,
    PostsModule,
    EnrollmentsModule,
    GradeLevelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
