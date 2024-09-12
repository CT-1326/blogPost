import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { loginInput } from '@dto/loginUser.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() input: loginInput, @Res() res: Response) {
    const { email, password } = input;

    const user = await this.userService.findUser(email);
    if (user) {
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }

      this.authService.setRefreshToken(user, res);
      const jwt = this.authService.getAccessToken(user);
      return res.status(200).send(jwt);
    }
  }
}
