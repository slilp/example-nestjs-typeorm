import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Homework } from './homework.entity';
import { Subject } from './subject.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  sid: number;

  @Column({
    length: 150,
  })
  username: string;

  @Column({
    length: 200,
  })
  password: string;

  @Column({
    length: 150,
    nullable: true,
  })
  firstName: string;

  @Column({
    length: 150,
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  profileImg: string;

  @OneToMany(() => Homework, (homework) => homework.student, { cascade: true })
  homeworks: Homework[];

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
