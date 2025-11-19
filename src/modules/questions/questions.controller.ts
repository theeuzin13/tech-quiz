import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The question has been successfully created.' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all questions.' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':uuid')
  @ApiResponse({ status: 200, description: 'The question has been successfully retrieved.' })
  findOne(@Param('uuid') uuid: string) {
    return this.questionsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiResponse({ status: 200, description: 'The question has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(uuid, updateQuestionDto);
  }

  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  remove(@Param('uuid') uuid: string) {
    return this.questionsService.delete(uuid);
  }
}
