import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // 환경변수 캐싱 설정
      isGlobal: true, // 환경변수 전역 설정
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService, // 몽고DB 연동 설정
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
