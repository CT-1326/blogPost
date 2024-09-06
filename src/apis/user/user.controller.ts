import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { CreateUserInput } from '../dto/createUser.dto';
import { UpdateUserInput } from '../dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserInput): Promise<User | undefined> {
    return this.userService.create(createUser);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') username: string): Promise<User | null> {
    return this.userService.findOne(username);
  }

  @Put(':name')
  async modify(
    @Param('name') username: string,
    @Body() modifyUser: UpdateUserInput,
  ): Promise<User> {
    return this.userService.modify(username, modifyUser);
  }

  @Delete(':name')
  async delete(@Param('name') username: string): Promise<User> {
    return this.userService.delete(username);
  }
}
