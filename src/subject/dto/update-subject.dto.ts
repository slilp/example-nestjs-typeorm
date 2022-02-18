import { IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto {
  @IsNotEmpty()
  name: string;

  logo: string;
}
