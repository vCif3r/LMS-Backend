import { IsNotEmpty, IsOptional } from "class-validator"
import { GradeLevel } from "src/modules/grade-level/entities/grade-level.entity"

export class CreateCourseDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    startDate: Date
    @IsNotEmpty()
    endDate: Date
    @IsNotEmpty()
    gradeLevel: GradeLevel
    gradeLevelId: number
    @IsOptional()
    imageUrl?: string
    @IsOptional()
    imagePublicId?: string
    //instructor: User
}
