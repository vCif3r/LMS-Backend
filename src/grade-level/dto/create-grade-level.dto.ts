import { IsEnum } from "class-validator"
import { Level } from "../entities/grade-level.entity"

export class CreateGradeLevelDto {
    nombre: string
    @IsEnum(Level)
    level: Level
    descripcion: string
}
