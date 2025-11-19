import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all categories.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully retrieved.' })
  findOne(@Param('uuid') uuid: string) {
    return this.categoriesService.findOne(+uuid);
  }

  @Put(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+uuid, updateCategoryDto);
  }

  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully removed.' })
  remove(@Param('uuid') uuid: string) {
    return this.categoriesService.remove(+uuid);
  }
}
