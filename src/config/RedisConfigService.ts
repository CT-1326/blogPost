import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from '@nestjs-modules/ioredis';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createRedisModuleOptions(): RedisModuleOptions {
    return {
      type: 'single',
      url: this.configService.get<string>('REDIS_URL'),
    };
  }
}
