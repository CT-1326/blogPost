import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@schemas/post.schema';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    NotificationModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
