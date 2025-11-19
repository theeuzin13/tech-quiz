import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { CategoryMapper } from './mappers/category.mapper';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ResponseCategoryDto> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return CategoryMapper.toResponseDto(category);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category already exists');
      }
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map(CategoryMapper.toResponseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findOne(uuid: string): Promise<ResponseCategoryDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { uuid } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return CategoryMapper.toResponseDto(category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<ResponseCategoryDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { uuid } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      Object.assign(category, updateCategoryDto);
      await this.categoryRepository.save(category);
      return CategoryMapper.toResponseDto(category);
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

  async remove(uuid: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findOne({ where: { uuid } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepository.delete({ uuid });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
