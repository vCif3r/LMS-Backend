import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { GradeLevel } from '../grade-level/entities/grade-level.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, GradeLevel]),
    CloudinaryModule
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
