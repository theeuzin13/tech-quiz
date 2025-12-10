import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { ResponseQuestionDto } from './dto/response-question.dto';
import { QuestionMapper } from './mappers/question.mapper';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<ResponseQuestionDto> {
    try {
      const question = this.questionRepository.create(createQuestionDto);
      await this.questionRepository.save(question);
      return QuestionMapper.toResponseDto(question);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category already exists');
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<ResponseQuestionDto[]> {
    try {
      const questions = await this.questionRepository.find();
      return questions.map(QuestionMapper.toResponseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve questions');
    }
  }

  async findOne(uuid: string): Promise<ResponseQuestionDto> {
    try {
      const question = await this.questionRepository.findOne({ where: { uuid } });
      if (!question) throw new NotFoundException(`Question #${uuid} not found`);
      return QuestionMapper.toResponseDto(question);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve question');
    }
  }

  async update(uuid: string, updateQuestionDto: UpdateQuestionDto): Promise<ResponseQuestionDto> {
    try {
      const question = await this.questionRepository.findOne({ where: { uuid } });
      if (!question) throw new NotFoundException(`Question #${uuid} not found`);

      Object.assign(question, updateQuestionDto);
      await this.questionRepository.save(question);
      return QuestionMapper.toResponseDto(question);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update question');
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      const result = await this.questionRepository.delete(uuid);

      if (result.affected === 0) {
        throw new NotFoundException(`Question #${uuid} not found`);
      }

    } catch (error) {

      if (error.code === '23503') {
        throw new BadRequestException(
          'Não é possível excluir esta pergunta pois existem alternativas vinculadas.'
        );
      }

      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException('Failed to delete question');
    }
  }
}
