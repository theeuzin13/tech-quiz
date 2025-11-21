import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/auth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Post()
  @ApiResponse({ status: 201, description: 'The question has been successfully created.' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
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

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Put(':uuid')
  @ApiResponse({ status: 200, description: 'The question has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(uuid, updateQuestionDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  remove(@Param('uuid') uuid: string) {
    return this.questionsService.delete(uuid);
  }
}
