import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlternativeEntity } from './entities/alternative.entity';
import { ResponseAlternativeDto } from './dto/response-alternative.dto';
import { AlternativeMapper } from './mappers/alternative.mapper';

@Injectable()
export class AlternativesService {
  constructor(
    @InjectRepository(AlternativeEntity)
    private readonly alternativeRepository: Repository<AlternativeEntity>,
  ) {}

  async create(createAlternativeDto: CreateAlternativeDto): Promise<ResponseAlternativeDto> {
      const alternative = this.alternativeRepository.create(createAlternativeDto);
      await this.alternativeRepository.save(alternative);
      return AlternativeMapper.toResponseDto(alternative);
  }

  async findAll(): Promise<ResponseAlternativeDto[]> {
    try{
      const alternatives = await this.alternativeRepository.find();
      return alternatives.map(AlternativeMapper.toResponseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve alternatives');
    }
    
  }

  async findOne(uuid: string): Promise<ResponseAlternativeDto> {
    try{
      const alternative =  await this.alternativeRepository.findOne({where: {uuid}});
      if (!alternative) {
        throw new NotFoundException('Alternative not found');
      }
      return AlternativeMapper.toResponseDto(alternative);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve alternative');
    }
  }

  async update(uuid: string, updateAlternativeDto: UpdateAlternativeDto): Promise<ResponseAlternativeDto> {
    try {
      const alternative = await this.alternativeRepository.findOne({where: {uuid}});
      if (!alternative) {
        throw new NotFoundException('Alternative not found');
      }
      Object.assign(alternative, updateAlternativeDto);
      await this.alternativeRepository.save(alternative);
      return AlternativeMapper.toResponseDto(alternative);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === '23505') {
        throw new ConflictException('Category with this data already exists');
      }
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      const alternative = await this.alternativeRepository.findOne({where: {uuid}});
      if (!alternative) {
        throw new NotFoundException('Alternative not found');
      }
      await this.alternativeRepository.delete(uuid);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete alternative');
    }
  }
}
