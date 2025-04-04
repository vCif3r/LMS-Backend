import { Role } from "src/roles/entities/role.entity"

export class CreateUserDto {
    firstName: string
    lastName: string
    email: string
    password: string
    dni: string
    role: Role
}
