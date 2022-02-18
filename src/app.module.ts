import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { HomeworkModule } from './homework/homework.module';
import { JobModule } from './job/job.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    HomeworkModule,
    JobModule,
    SubjectModule,
    AuthModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
