import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../database/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  public async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async findOne(id: string): Promise<Student> {
    const studentInfo = await this.studentRepository.findOne({
      where: { sid: id },
    });
    if (!studentInfo) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return studentInfo;
  }

  public async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const studentInfo = await this.studentRepository.findOne({
      where: { username: createStudentDto.username },
    });
    if (studentInfo) {
      throw new BadRequestException(
        `Student ${createStudentDto.username} is exist`,
      );
    }
    const hash = await bcrypt.hash(createStudentDto.password, 10);
    createStudentDto.password = hash;
    return await this.studentRepository.save(createStudentDto);
  }

  public async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | any> {
    const updateResult = await this.studentRepository.update(
      id,
      updateStudentDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
