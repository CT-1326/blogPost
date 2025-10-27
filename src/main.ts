import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { rabbitMQConfig } from './config/rabbitMQConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 입력 값 유효성 검증 전역 파이프 설정
  app.use(cookieParser()); // 쿠키 파싱 설정
  app.connectMicroservice(rabbitMQConfig()); // RabbitMQ 마이크로서비스 연결 설정
  await app.startAllMicroservices(); // 모든 마이크로서비스 시작
  await app.listen(3000);
}
bootstrap();
