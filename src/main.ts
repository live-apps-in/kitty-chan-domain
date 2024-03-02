import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kittyChangRPCOptions } from 'src/microservice/gRPC';
import { OnInit } from 'src/jobs/on-init';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kittyChangRPCOptions,
  );

  //Perform data sync during application bootstrap
  await app.get(OnInit).bootstrap();

  await app.listen();
}

bootstrap();
