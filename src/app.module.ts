import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { PostModule } from '@post/post.module';
import { CommentModule } from '@comment/comment.module';

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
    AuthModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
