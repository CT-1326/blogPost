import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getAccessToken(user: any): string {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '60m',
      },
    );
  }

  setRefreshToken(user: any, res: Response) {
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        role: user.role,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '2d',
      },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    return;
  }
}
