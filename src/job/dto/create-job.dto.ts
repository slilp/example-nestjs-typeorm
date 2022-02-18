import { IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  title: string;

  desc: string;

  @IsNotEmpty()
  subjectId: string;

  @IsNotEmpty()
  teacherId: string;
}
