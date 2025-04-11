import { Course } from "src/modules/courses/entities/course.entity"
import { User } from "src/modules/users/entities/user.entity"

export class CreateEnrollmentDto {
    course: Course
    courseId: string
    user: User
    userId: string
}
