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
import { RolesGuard } from '@auth/roles/roles.guard';
import { Roles } from '@auth/roles/roles.decorator';

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

  @UseGuards(AuthGuard('access'), RolesGuard)
  @Roles('admin')
  @Get()
  async findUser(): Promise<User[]> {
    return this.userService.findUser();
  }

  @UseGuards(AuthGuard('access'), RolesGuard)
  @Roles('admin')
  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    return this.userService.findOne(email);
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

  @UseGuards(AuthGuard('access'), RolesGuard)
  @Roles('admin')
  @Delete(':name')
  async deleteUser(@Param('name') username: string): Promise<User> {
    return this.userService.deleteUser(username);
  }
}
