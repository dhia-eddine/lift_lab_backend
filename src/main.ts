import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //the added start from here
  app.enableCors({
    origin: true, // You can change this to your specific frontend URL (e.g., http://localhost:5173)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow sending cookies
    preflightContinue: false,
  });
  // Add a global validation pipe to handle incoming data validation
  app.useGlobalPipes(new ValidationPipe());

  //end here
  await app.listen(3000);
}
bootstrap();