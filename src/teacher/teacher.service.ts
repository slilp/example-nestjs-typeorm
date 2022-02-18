import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../database/teacher.entity';
import { Subject } from '../database/subject.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  public async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  public async findOne(id: string): Promise<Teacher> {
    const subjectInfo = await this.teacherRepository.findOne({
      where: { tid: id },
      relations: ['subject'],
    });
    if (!subjectInfo) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    return subjectInfo;
  }

  public async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const subjectInfo = await this.subjectRepository.findOne({
      where: { username: createTeacherDto.username },
    });
    if (subjectInfo) {
      throw new NotFoundException(
        `Subject ${createTeacherDto.username} is exist`,
      );
    }
    const request = Object.assign(new Teacher(), createTeacherDto);
    request.subject = subjectInfo;
    const hash = await bcrypt.hash(request.password, 10);
    request.password = hash;
    return await this.teacherRepository.save(request);
  }

  public async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher | any> {
    const updateResult = await this.teacherRepository.update(
      id,
      updateTeacherDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
