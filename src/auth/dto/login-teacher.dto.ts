import { IsNotEmpty, IsEmail } from 'class-validator';
import { Teacher } from '../../database/teacher.entity';

export class LoginTeacherDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}

export interface LoginTeacherResponseDto {
  teacher: Teacher;
  accessToken: string;
}
