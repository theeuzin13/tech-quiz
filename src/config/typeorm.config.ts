import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { QuestionEntity } from 'src/modules/questions/entities/question.entity';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') ?? 'localhost',
  port: Number(configService.get('DB_PORT') ?? 5432),
  username: String(configService.get('DB_USERNAME')),
  password: String(configService.get('DB_PASSWORD')),
  database: String(configService.get('DB_NAME')),
  entities: [CategoryEntity, QuestionEntity],
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  synchronize: false,
});