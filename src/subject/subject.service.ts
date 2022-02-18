import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../database/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  public async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  public async findOne(id: string): Promise<Subject> {
    const subjectInfo = await this.subjectRepository.findOne({
      where: { uid: id },
    });
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return subjectInfo;
  }

  public async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      return await this.subjectRepository.save(createSubjectDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject | any> {
    const updateResult = await this.subjectRepository.update(
      id,
      updateSubjectDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
