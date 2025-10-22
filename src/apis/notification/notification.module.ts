import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationConsumer } from './notification.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'blog_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [NotificationConsumer],
  exports: [ClientsModule],
})
export class NotificationModule {}
