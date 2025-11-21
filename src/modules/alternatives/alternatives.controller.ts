import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/auth.guard';
import { AlternativesService } from './alternatives.service';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';

@Controller('alternatives')
export class AlternativesController {
  constructor(private readonly alternativesService: AlternativesService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)  
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

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Put(':uuid')
  @ApiResponse({ status: 200, description: 'The alternative has been successfully updated.' })
  update(@Param('uuid') uuid: string, @Body() updateAlternativeDto: UpdateAlternativeDto) {
    return this.alternativesService.update(uuid, updateAlternativeDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard) 
  @Delete(':uuid')
  @ApiResponse({ status: 200, description: 'The alternative has been successfully removed.' })
  remove(@Param('uuid') uuid: string) {
    return this.alternativesService.delete(uuid);
  }
}
