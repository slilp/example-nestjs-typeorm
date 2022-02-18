import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../database/job.entity';
import { Student } from '../database/student.entity';
import { Homework } from '../database/homework.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
  ) {}

  public async findAllByStudent(sid: string): Promise<Homework[]> {
    return await this.homeworkRepository.find({
      where: { student: { sid: sid } },
    });
  }

  public async findAllByJob(jid: string): Promise<Homework[]> {
    return await this.homeworkRepository.find({
      where: { job: { jid: jid } },
    });
  }

  public async findOne(id: string): Promise<Job> {
    const homeworkInfo = await this.jobRepository.findOne({
      where: { hid: id },
    });
    if (!homeworkInfo) {
      throw new NotFoundException(`Job ${id} not found`);
    }
    return homeworkInfo;
  }

  public async create(createHomeworkDto: CreateHomeworkDto): Promise<Homework> {
    const studentInfo = await this.studentRepository.findOne({
      where: { sid: createHomeworkDto.studentId },
    });
    if (!studentInfo) {
      throw new NotFoundException(
        `Student ${createHomeworkDto.studentId} not found`,
      );
    }

    const jobInfo = await this.jobRepository.findOne({
      where: { jid: createHomeworkDto.jobId },
    });
    if (!jobInfo) {
      throw new NotFoundException(
        `Teacher ${createHomeworkDto.jobId} not found`,
      );
    }

    const request = Object.assign(new Homework(), createHomeworkDto);
    request.student = studentInfo;
    request.job = jobInfo;

    return await this.homeworkRepository.save(request);
  }

  public async update(
    id: string,
    updateHomeworkDto: UpdateHomeworkDto,
  ): Promise<Job | any> {
    const updateResult = await this.homeworkRepository.update(
      id,
      updateHomeworkDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Homework ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.homeworkRepository.delete(id);
  }
}
