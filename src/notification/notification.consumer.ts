import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationConsumer {
  @EventPattern('post.created')
  async handlePostCreated(@Payload() data: any) {
    // 전체 사용자에게 알림 전송
    console.log('새로운 게시물이 작성됨!', data);
  }

  @EventPattern('comment.created')
  async handleCommentCreated(@Payload() data: any) {
    // 해당 게시물 작성자에게 알림 전송
    console.log('게시물에 댓글이 작성됨!', data);
  }
}
