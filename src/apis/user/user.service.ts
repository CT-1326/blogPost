import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: CreateUserInput): Promise<User | undefined> {
    try {
      const createdUser = new this.userModel(input);
      return await createdUser.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictException(`이미 존재하는 계정 입니다.`);
      } else {
        throw new InternalServerErrorException('서버 에러 발생!');
      }
    }
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.find().exec();
    if (result.length === 0) {
      throw new NotFoundException('서버에 등록된 사용자가 없습니다.');
    }
    return result;
  }

  async findOne(username: string): Promise<User | null> {
    const result = await this.userModel.findOne({ username }).exec();
    if (result === null) {
      throw new NotFoundException('해당 사용자는 존재하지 않습니다');
    }
    return result;
  }
}
