import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateUserDto {
    firstName: string
    lastName: string
    email: string
    password: string
    dni: string
    @IsNumber()
    @IsNotEmpty()
    roleId: number
}
