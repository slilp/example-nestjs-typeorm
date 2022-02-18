import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../database/student.entity';
import { Teacher } from '../database/teacher.entity';
import {
  LoginStudentDto,
  LoginStudentResponseDto,
} from './dto/login-student.dto';
import {
  LoginTeacherDto,
  LoginTeacherResponseDto,
} from './dto/login-teacher.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    private jwtService: JwtService,
  ) {}

  public async studentSignIn(
    loginStudentDto: LoginStudentDto,
  ): Promise<LoginStudentResponseDto> {
    const studentInfo = await this.studentRepository.findOne({
      where: { username: loginStudentDto.username },
    });
    if (!studentInfo) {
      throw new NotFoundException(
        `Student ${loginStudentDto.username} not found or invalid password`,
      );
    }
    const isMatch = await bcrypt.compare(
      loginStudentDto.password,
      studentInfo.password,
    );
    if (!isMatch)
      throw new NotFoundException(
        `Student ${loginStudentDto.username} not found or invalid password`,
      );
    studentInfo.password = null;
    const payload = { data: JSON.stringify(studentInfo) };
    return {
      student: studentInfo,
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async teacherSignIn(
    loginTeacherDto: LoginTeacherDto,
  ): Promise<LoginTeacherResponseDto> {
    const teacherInfo = await this.teacherRepository.findOne({
      where: { username: loginTeacherDto.username },
    });
    if (!teacherInfo) {
      throw new NotFoundException(
        `Teacher ${loginTeacherDto.username} not found or invalid password`,
      );
    }
    const isMatch = await bcrypt.compare(
      loginTeacherDto.password,
      teacherInfo.password,
    );
    if (!isMatch)
      throw new NotFoundException(
        `Teacher ${loginTeacherDto.username} not found or invalid password`,
      );
    teacherInfo.password = null;
    const payload = { data: JSON.stringify(teacherInfo) };
    return {
      teacher: teacherInfo,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
