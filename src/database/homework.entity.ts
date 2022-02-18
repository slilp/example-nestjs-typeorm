import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Job } from './job.entity';

@Entity('homework')
export class Homework {
  @PrimaryGeneratedColumn()
  hid: number;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @ManyToOne(() => Student, (student) => student.homeworks)
  @JoinColumn({ name: 'sid' })
  student: Student;

  @ManyToOne(() => Job, (job) => job.homeworks)
  @JoinColumn({ name: 'jid' })
  job: Job;
}
