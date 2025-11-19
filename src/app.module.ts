import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AlternativesModule } from './modules/alternatives/alternatives.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    CategoriesModule,
    QuestionsModule,
    AlternativesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
