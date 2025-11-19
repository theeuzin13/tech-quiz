import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
    Logger.log('Swagger initialized');
  }

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: port ${port}`);
}
bootstrap();
