import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class UserPaginationDto extends PaginationDto {
  @IsString()
  @IsOptional()
  orderBy?: string = 'createdAt';

  @IsString()
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  search: string;
}
