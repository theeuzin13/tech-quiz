import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AlternativesService } from './alternatives.service';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('alternatives')
export class AlternativesController {
  constructor(private readonly alternativesService: AlternativesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The alternative has been successfully created.' })
  create(@Body() createAlternativeDto: CreateAlternativeDto) {
    return this.alternativesService.create(createAlternativeDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all alternatives.' })
  findAll() {
    return this.alternativesService.findAll();
  }

  @Get(':uuid')
  @ApiResponse({ status: 200, description: 'The alternative has been successfully retrieved.' })
  findOne(@Param('uuid') uuid: string) {
    return this.alternativesService.findOne(uuid);
  }

  @Put(':uuid')
  @ApiResponse({ status: 200, description: 'The alternative has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateAlternativeDto: UpdateAlternativeDto) {
    return this.alternativesService.update(uuid, updateAlternativeDto);
  }

  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The alternative has been successfully removed.' })
  remove(@Param('uuid') uuid: string) {
    return this.alternativesService.delete(uuid);
  }
}
