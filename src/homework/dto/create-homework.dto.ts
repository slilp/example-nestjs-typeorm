import { IsNotEmpty } from 'class-validator';

export class CreateHomeworkDto {
  @IsNotEmpty()
  title: string;

  desc: string;

  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  jobId: string;
}
