import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Homework } from './homework.entity';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Entity('job')
export class Job {
  @PrimaryGeneratedColumn()
  jid: number;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @OneToMany(() => Homework, (homework) => homework.job, { cascade: true })
  homeworks: Homework[];

  @ManyToOne(() => Subject, (subject) => subject.jobs)
  @JoinColumn({ name: 'uid' })
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.jobs)
  @JoinColumn({ name: 'tid' })
  teacher: Teacher;
}
