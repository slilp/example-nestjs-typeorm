import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from '../database/teacher.entity';
import { Subject } from '../database/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
