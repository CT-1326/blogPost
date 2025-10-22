import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationConsumer {
  @EventPattern('post.created')
  async handlePostCreated(@Payload() data: any) {
    // TODO: 전체 사용자에게 알림 전송 로직 구현
    console.log('Post created event received:', data);
  }

  @EventPattern('comment.created')
  async handleCommentCreated(@Payload() data: any) {
    // TODO: 해당 게시물 작성자에게 알림 전송 로직 구현
    console.log('Comment created event received:', data);
  }
}
