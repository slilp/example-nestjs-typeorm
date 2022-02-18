import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../database/job.entity';
import { Subject } from '../database/subject.entity';
import { Teacher } from '../database/teacher.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  public async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  public async findOne(id: string): Promise<Job> {
    const jobInfo = await this.jobRepository.findOne({
      where: { jid: id },
      relations: ['subject', 'teacher'],
    });
    if (!jobInfo) {
      throw new NotFoundException(`Job ${id} not found`);
    }
    return jobInfo;
  }

  public async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const subjectInfo = await this.subjectRepository.findOne({
        where: { uid: createJobDto.subjectId },
      });
      if (!subjectInfo) {
        throw new NotFoundException(
          `Subject ${createJobDto.subjectId} not found`,
        );
      }

      const teacherInfo = await this.teacherRepository.findOne({
        where: { tid: createJobDto.teacherId },
      });
      if (!teacherInfo) {
        throw new NotFoundException(
          `Teacher ${createJobDto.teacherId} not found`,
        );
      }

      const request = Object.assign(new Job(), createJobDto);
      request.subject = subjectInfo;
      request.teacher = teacherInfo;

      return await this.jobRepository.save(request);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string,
    updateJobDto: UpdateJobDto,
  ): Promise<Job | any> {
    const updateResult = await this.jobRepository.update(id, updateJobDto);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
