import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  logo: string;
}
