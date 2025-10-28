import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });
  }

  validate(payload: any) {
    // console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
      role: payload.role,
    };
  }
}
