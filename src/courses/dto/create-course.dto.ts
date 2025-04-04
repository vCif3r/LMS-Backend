import { IsNotEmpty, IsOptional } from "class-validator"
import { GradeLevel } from "src/grade-level/entities/grade-level.entity"
import { User } from "src/users/entities/user.entity"

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
    @IsOptional()
    image?: string
    //instructor: User
}
