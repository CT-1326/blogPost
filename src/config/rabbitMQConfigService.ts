import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'blog_queue',
    queueOptions: { durable: true },
  },
});
