import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { CreateUserInput } from '../dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserInput): Promise<User> {
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
}
