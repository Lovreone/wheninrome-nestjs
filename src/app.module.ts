import { Config } from './../config/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandmarksModule } from './landmarks/landmarks.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.mongoConn),
    CitiesModule,
    LandmarksModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
