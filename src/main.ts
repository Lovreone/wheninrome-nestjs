import { swaggerBasicAuth } from './helpers/swagger-basic-auth';
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
  app.use(swaggerBasicAuth);
  const config = new DocumentBuilder()
    .setTitle('When-in-Rome NestJS')
    .setDescription('API Documentation for When-in-Rome application web services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Config.swaggerRoute, app, document); 

  await app.listen(3000);

  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
