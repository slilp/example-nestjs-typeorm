import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Job } from './job.entity';
import { Student } from './student.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'subject' })
export class Subject {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  uid: number;

  @ApiProperty()
  @Column({
    length: 150,
  })
  name: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  logo: string;

  @ApiProperty()
  @OneToMany(() => Teacher, (teacher) => teacher.subject, { cascade: true })
  teachers: Teacher[];

  @ApiProperty()
  @OneToMany(() => Job, (job) => job.subject, { cascade: true })
  jobs: Job[];
}
