import { GradeLevelPagination } from './dto/grade-level-pagination.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeLevelDto } from './dto/create-grade-level.dto';
import { UpdateGradeLevelDto } from './dto/update-grade-level.dto';
import { GradeLevel } from './entities/grade-level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GradeLevelService {
  constructor(
    @InjectRepository(GradeLevel)
    private readonly gradeLevelRepository: Repository<GradeLevel>,
  ) { }

  create(createGradeLevelDto: CreateGradeLevelDto) {
    const newGl = this.gradeLevelRepository.create(createGradeLevelDto)
    return this.gradeLevelRepository.save(newGl);
  }

  async findAll(filterDto: GradeLevelPagination) {
    const { page = 1, limit = 10, name, level, orderBy = 'createdAt', order = 'DESC' } = filterDto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.gradeLevelRepository.createQueryBuilder('grade-level');
    // verificar filtros
    if (name) queryBuilder.andWhere('grade-level.name ILIKE :name', { name: `%${name}%` });
    if (level) queryBuilder.andWhere('grade-level.level ILIKE :level', { email: `%${level}%` });
    if (orderBy && order) queryBuilder.orderBy(`grade-level.${orderBy}`, order);
    // Paginación
    queryBuilder.skip(skip).take(limit);
    // Ejecutar la consulta
    const [gradeLevels, total] = await queryBuilder.getManyAndCount();
    // Calcular total de páginas
    const totalPages = Math.ceil(total / limit);
    return {
      data: gradeLevels,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  findAllByName(query: any) {
    const { name } = query; // Desestructurar el nombre de la consulta
    if (name) {
      return this.gradeLevelRepository.find({
        where: [
          {
            name: Like(`%${name}%`), //  buscar por nombre
          },
        ],
      });
    } else {
      return this.gradeLevelRepository.find({
        order: { createdAt: 'DESC' },
        take: 5, // Solo los 5 más recientes
      });
    }
  }

  async findOne(id: number) {
    const gradeLevel = await this.gradeLevelRepository.findOneBy({id});
    if (!gradeLevel) throw new NotFoundException(`Grado con ID ${id} no encontrado`)
    return gradeLevel;
  }

  async update(id: number, updateGradeLevelDto: UpdateGradeLevelDto) {
    const gradeLevel = await this.gradeLevelRepository.findOneBy({ id });
    if (!gradeLevel) {
      throw new NotFoundException(`Grado con ID ${id} no encontrado`);
    }
    Object.assign(gradeLevel, updateGradeLevelDto);
    return this.gradeLevelRepository.save(gradeLevel);
  }

  async remove(id: number) {
    const result = await this.gradeLevelRepository.softDelete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Grado con ID ${id} no encontrado`);
    }
  }

  async restore(id: number){
    const result = await this.gradeLevelRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GradeLevel con ID ${id} no encontrado o no está eliminado`);
    }
  }
}
