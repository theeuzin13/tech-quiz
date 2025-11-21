import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Post()
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all categories.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully retrieved.' })
  findOne(@Param('uuid') uuid: string) {
    return this.categoriesService.findOne(uuid);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Put(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(uuid, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The category has been successfully removed.' })
  remove(@Param('uuid') uuid: string) {
    return this.categoriesService.remove(uuid);
  }
}
