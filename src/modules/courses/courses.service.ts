import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CoursePagination } from './dto/course-pagination.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GradeLevel } from '../grade-level/entities/grade-level.entity'; 

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(GradeLevel)
    private readonly gradeLevelRepository: Repository<GradeLevel>,
    private cloudinaryService: CloudinaryService,
  ) { }
  async create(createCourseDto: CreateCourseDto, imagen: Express.Multer.File) {
    const newCourse = this.courseRepository.create(createCourseDto);
    const grade = await this.gradeLevelRepository.findOneBy({ id: createCourseDto.gradeLevelId })
    if (!grade) throw new Error('grade level not found');
    
    newCourse.gradeLevel = grade;
    if (imagen) {
      const cloudinaryResponse = await this.cloudinaryService.uploadImage(
        imagen,
        `cursos/${grade.name}`
      );
      newCourse.imageUrl = cloudinaryResponse.secure_url;
      newCourse.imagePublicId = cloudinaryResponse.public_id;
    }
    return this.courseRepository.save(newCourse);
  }

  async findAll(pagination: CoursePagination) {
    const { page = 1, limit = 10, name, orderBy, order } = pagination
    const skip = (page - 1) * limit;
    const queryBuilder = this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.gradeLevel', 'gradeLevel')
      .withDeleted();
    if (name) queryBuilder.andWhere('course.name ILIKE :name', {
      name: `%${name}%`
    })
    if (orderBy && order) {
      queryBuilder.orderBy(`course.${orderBy}`, order)
    }
    queryBuilder.skip(skip).take(limit);
    const [courses, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      }
    }
  }

  findOne(id: string) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['gradeLevel']
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
