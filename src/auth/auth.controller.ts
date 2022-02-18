import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStudentDto } from '../auth/dto/login-student.dto';
import { LoginTeacherDto } from '../auth/dto/login-teacher.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/student/signin')
  loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.authService.studentSignIn(loginStudentDto);
  }

  @Post('/teacher/signin')
  loginTeacher(@Body() loginTeacherDto: LoginTeacherDto) {
    return this.authService.teacherSignIn(loginTeacherDto);
  }
}
