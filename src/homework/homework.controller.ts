import {
  Controller,
  Put,
  Get,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Get('student:/id')
  findAllByStudent(@Param('id') id: string) {
    return this.homeworkService.findAllByStudent(id);
  }

  @Get('job/:id')
  findAllByJob(@Param('id') id: string) {
    return this.homeworkService.findAllByJob(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworkService.remove(id);
  }
}
