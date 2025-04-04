import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    const newCourse = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(newCourse);
  }

  async findAll(pagination: PaginationDto) {
    const limit = pagination.limit || 10;
    const page = pagination.page || 1;
    return await this.courseRepository.find({
      skip: (page - 1) * limit,
      take: pagination.limit ?? 10,
      relations: ['gradeLevel']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
