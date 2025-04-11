import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class GradeLevelPagination extends PaginationDto{
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    level?: string;

    @IsString()
    @IsOptional()
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    order?: 'ASC' | 'DESC' = 'ASC';
}