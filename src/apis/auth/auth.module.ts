import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas/user.schema';
import { UserModule } from '../user/user.module';
import { JwtRefreshStretagy } from './refresh.strategy';
import { JwtAccessStrategy } from './access.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStretagy, JwtAccessStrategy],
})
export class AuthModule {}
