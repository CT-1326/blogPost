import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }

  validate(payload: any) {
    // console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
