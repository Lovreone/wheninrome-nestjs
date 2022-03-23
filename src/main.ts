import { Config } from './../config/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation init for class-validator (requires class-transformer)
  app.useGlobalPipes(new ValidationPipe());

  // To allow client app to communicate on localhost
  app.enableCors({origin: Config.origin});

  // Swagger docs init
  const config = new DocumentBuilder()
    .setTitle('When-in-Rome NestJS')
    .setDescription('API Documentation for When-in-Rome application web services')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document); 

  await app.listen(3000);
}
bootstrap();
