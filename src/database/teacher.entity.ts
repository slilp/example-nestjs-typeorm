import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Job } from './job.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'teacher' })
export class Teacher {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  tid: number;

  @ApiProperty()
  @Column({
    length: 150,
  })
  username: string;

  @ApiProperty()
  @Column({
    length: 200,
  })
  password: string;

  @ApiProperty()
  @Column({
    length: 150,
    nullable: true,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    length: 150,
    nullable: true,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  profileImg: string;

  @ApiProperty()
  @ManyToOne(() => Subject, (subject) => subject.teachers)
  @JoinColumn({ name: 'uid' })
  subject: Subject;

  @ApiProperty()
  @OneToMany(() => Job, (job) => job.teacher, { cascade: true })
  jobs: Job[];
}
