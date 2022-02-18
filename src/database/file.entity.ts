import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn()
  fid: number;

  @Column()
  path: string;

  @Column({
    nullable: true,
  })
  ref: string;
}
