import { Module } from '@nestjs/common';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../database/job.entity';
import { Student } from '../database/student.entity';
import { Homework } from '../database/homework.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Student, Homework])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
