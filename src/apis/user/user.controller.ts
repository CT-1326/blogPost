import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@schemas/user.schema';
import { CreateUserInput } from '@dto/createUser.dto';
import { UpdateUserInput } from '@dto/updateUser.dto';
import bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUser: CreateUserInput,
  ): Promise<User | undefined> {
    // 비밀번호 해싱처리 후 새 객체로 서비스에 전달
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    const user = {
      ...createUser,
      password: hashedPassword,
    };
    return this.userService.createUser(user);
  }

  @Get()
  async findUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':name')
  async findOne(@Param('name') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @UseGuards(AuthGuard('access'))
  @Put(':name')
  async modifyUser(
    @Param('name') username: string,
    @Body() updateUser: UpdateUserInput,
  ): Promise<User> {
    // 변경한 비밀번호 역시 해싱처리 후 서비스에 전달
    updateUser.password = await bcrypt.hash(updateUser.password, 10);
    return this.userService.modifyUser(username, updateUser);
  }

  @Delete(':name')
  async deleteUser(@Param('name') username: string): Promise<User> {
    return this.userService.deleteUser(username);
  }
}
