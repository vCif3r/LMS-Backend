import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserPaginationDto } from './dto/user-pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
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

  findOne(id: number) {
    return "hola"
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
