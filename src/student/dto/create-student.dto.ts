import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;

  firstName: string;

  lastName: string;

  profileImg: string;
}
