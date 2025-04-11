import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentsService {
  @InjectRepository(Enrollment)
  private readonly enrollmentRepository: Repository<Enrollment>

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const enrollmentExists = await this.enrollmentRepository.findOne({
      where: {
        user: { id: createEnrollmentDto.userId },
        course: { id: createEnrollmentDto.courseId}
      },
      relations: ['course', 'user']
    })
    if( enrollmentExists ){
      throw new Error('Ya existe una matricula')
    }
    const enrollment = this.enrollmentRepository.create(createEnrollmentDto)
    return await this.enrollmentRepository.save(enrollment);
  }

  findAll() {
    return `This action returns all enrollments`;
  }

  async getEnrolledCoursesByUser(userId: string){
    const enrollments = await this.enrollmentRepository.find({
      where: { user: { id: userId} },
      relations: ['user', 'course']
    })
    return enrollments.map(enrollment => enrollment.course)
  }

  findOne(id: string) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
