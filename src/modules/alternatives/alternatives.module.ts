import { Module } from '@nestjs/common';
import { AlternativesService } from './alternatives.service';
import { AlternativesController } from './alternatives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlternativeEntity } from './entities/alternative.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlternativeEntity])],
  controllers: [AlternativesController],
  providers: [AlternativesService],
})
export class AlternativesModule {}
