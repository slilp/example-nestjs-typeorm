import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../database/job.entity';
import { Subject } from '../database/subject.entity';
import { Teacher } from '../database/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Subject, Teacher])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
