import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserPaginationDto } from './dto/user-pagination.dto';
import { Role } from '../roles/entities/role.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesRepository.findOneBy({id: createUserDto.roleId});
    if (!role) {
      throw new Error('Role not found');
    }
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { dni: createUserDto.dni },
      ],
    });
    if (existingUser) {
      throw new Error('User with this email or dni already exists');
    }
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: role,
      password: hashedPassword,
    })

    return this.userRepository.save(newUser);
  }

  async findAll(userPagination: UserPaginationDto) { 
    const { page = 1, limit = 10, orderBy, order, search } = userPagination;
    const skip = (page - 1) * limit;
    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('role.name != :roleName', { roleName: 'superuser' });
  
    if (search) {
      queryBuilder.andWhere('(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.dni ILIKE :search)', {
        search: `%${search}%`
      });
    }
    if (orderBy && order) queryBuilder.orderBy(`user.${orderBy}`, order);
    queryBuilder.skip(skip).take(limit);
    const [users, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      }
    };
  }
  

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
      relations: ['role']
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['role']
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async restore(id: number) {
    const result = await this.userRepository.restore(id);
    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }
}
